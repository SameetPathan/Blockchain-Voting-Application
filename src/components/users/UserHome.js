import React from 'react';
import { FaUserPlus, FaList, FaPoll } from 'react-icons/fa';
import DashboardHeading from '../DashboardHeading';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VoterABi, VoterContractAddress } from '../contractAddress';
import { ethers } from 'ethers';

function UserHome(props) {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(VoterContractAddress, VoterABi, signer);
        let txn;

        txn = await voteContract.voterRegistration();
        console.log("Mining... please wait");
        await txn.wait();
        console.log(`Mined`);
        toast.success("Voter Registration Completed.");
        //window.history.back();
   
      } else {
        toast.error(
          "Voter Registration Failed. Please check if you already Registerd or registration may have been closed."
        );
        console.log(`Error`);
      }
    } catch (err) {
      toast.error(
        "Voter Registration Failed. Please check if you already Registerd or registration may have been closed."
      );
      console.log(err);
    }
  
  };

  return (
    <>
      <DashboardHeading text={"Welcome to User Home"} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4 mb-4 ">
            <div className="card h-100 bg-dark text-light">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Voter Registration</h5>
                <p className="card-text">Click below to register as a voter</p>
                <button onClick={handleSubmit} disabled={props.currentSateNum!==0} className="btn btn-primary">
                  <FaUserPlus className="mr-2" /> Register Voter
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 bg-dark text-light">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Contestants List</h5>
                <p className="card-text">Click below to view contestants list</p>
                <Link to="/contestant-list" className="btn btn-primary">
                  <FaList className="mr-2" /> Contestants List
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 bg-dark text-light">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">View Results</h5>
                <p className="card-text">Click below to view election results</p>
                {props.currentSateNum===2 ? (
                  <Link to="/winner" className="btn btn-primary">
                    <FaPoll className="mr-2" /> View Results
                  </Link>
                ) : (
                  <button className="btn btn-primary" disabled>
                    <FaPoll className="mr-2" /> View Results
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHome;
