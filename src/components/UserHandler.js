// UserTypeSelection.js
import React, { useState, useEffect } from "react";
import { FaUser, FaGavel } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { profileABI, profileAddress } from "./contractAddress";

const UserHandler = (props) => {
  const [selectedType, setSelectedType] = useState(null);
  const [account, setAccount] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const handleUserTypeSelection = (userType) => {
    setSelectedType(userType);
  };

  const handleGetProfile = async (e) => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setAccount(accounts[0]);

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const ProfileContract = new ethers.Contract(
          profileAddress,
          profileABI,
          signer
        );

        const isprofile = await ProfileContract.userExists(accounts[0]);

        if (isprofile) {
          const profile = await ProfileContract.getProfileById(accounts[0]);
          props.setuserDetails(profile);
          setUserProfile(profile);
        } else {
          setUserProfile([]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  const renderDashboardButtons = () => {
    if (!userProfile) {
      return null;
    }

    const userType = userProfile[4];

    switch (userType) {
      case "user":
        return (
          <div class="card">
            <div class="card-body" style={{ width: "290px" }}>
              <Link
                to="/user-home"
                className={`btn btn-${
                  selectedType === "user" ? "success" : "dark"
                } m-2`}
                onClick={() => handleUserTypeSelection("user")}
              >
                <FaUser size={40} className="mb-2" />
                <br /> <br></br>
                Welcome to user Dashboard <br></br> <br></br> <br></br>
              </Link>
            </div>
          </div>
        );
      case "admin":
        return (
          <div class="card ml-3">
            <div class="card-body" style={{ width: "300px" }}>
              <Link
                to="/admin-home"
                className={`btn btn-${
                  selectedType === "admin" ? "primary" : "dark"
                } m-2`}
                onClick={() => handleUserTypeSelection("admin")}
              >
                <FaGavel size={40} className="mb-2" />
                <br /> <br></br>
                Welcome to admin Dashboard
                <br></br> <br></br> <br></br>
              </Link>
            </div>
          </div>
        );
      case "master":
        return (
          <>
            <div class="card">
              <div class="card-body" style={{ width: "290px" }}>
                <Link
                  to="/user-home"
                  className={`btn btn-${
                    selectedType === "user" ? "success" : "dark"
                  } m-2`}
                  onClick={() => handleUserTypeSelection("user")}
                >
                  <FaUser size={40} className="mb-2" />
                  <br /> <br></br>
                  Welcome to user Dashboard <br></br> <br></br> <br></br>
                </Link>
              </div>
            </div>

            <div class="card ml-3">
              <div class="card-body" style={{ width: "300px" }}>
                <Link
                  to="/admin-home"
                  className={`btn btn-${
                    selectedType === "admin" ? "primary" : "dark"
                  } m-2`}
                  onClick={() => handleUserTypeSelection("admin-home")}
                >
                  <FaGavel size={40} className="mb-2" />
                  <br /> <br></br>
                  Welcome to admin Dashboard<br></br> <br></br> <br></br>
                </Link>
              </div>
            </div>
            
          </>
        );
      default:
        return (
          <div class="card ml-3">
            <div class="card-body" style={{ width: "290px" }}>
              <Link
                to="/profile"
                className={`btn btn-${
                  selectedType === "admin" ? "primary" : "dark"
                } m-2`}
              >
                <FaGavel size={40} className="mb-2" />
                <br /> <br></br>
                Welcome to Blockchain Voting
                <br></br> <br></br> <br></br>
                <p>Here, you can login as user or admin.</p>
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          {renderDashboardButtons()}
        </div>
      </div>
    </>
  );
};

export default UserHandler;
