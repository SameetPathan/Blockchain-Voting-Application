import React from 'react';
import { FaEye, FaCog, FaList, FaSyncAlt, FaAward, FaCalculator} from 'react-icons/fa';
import DashboardHeading from '../DashboardHeading';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { VoterABi, VoterContractAddress } from '../contractAddress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminHome(props) {

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

        txn = await voteContract.resetContest();
        console.log("Mining... please wait");
        await txn.wait();
        console.log(`Mined`);
        toast.success("Reset Completed.");
        window.history.back();
   
      } else {
        toast.error(
          "Reset Failed."
        );
        console.log(`Error`);
      }
    } catch (err) {
      toast.error(
        "Reset Failed."
      );
      console.log(err);
    }
  
  };

  const handleSubmitCalculate = async (e) => {
    e.preventDefault();
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(VoterContractAddress, VoterABi, signer);
        let txn;

        txn = await voteContract.calculateResult();
        console.log("Mining... please wait");
        await txn.wait();
        console.log(`Mined`);
        toast.success("calculate Completed.");
        window.history.back();
   
      } else {
        toast.error(
          "calculate Failed."
        );
        console.log(`Error`);
      }
    } catch (err) {
      toast.error(
        "calculate Failed."
      );
      console.log(err);
    }
  
  };


  return (
    <>
      <DashboardHeading text={"Welcome to Admin Home"} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4 mb-4 ">
            <div className="card h-100 bg-dark text-light">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Add Contestant</h5>
                <p className="card-text">Click below to add Contestant</p>
                {props.currentSateNum!==2 ? (
                  <Link to="/admin-add-contestant" className="btn btn-primary">
                  <FaEye className="mr-2" /> Add Contestant
                </Link>
                ) : (
                  <button className="btn btn-primary" disabled>
                    <FaEye className="mr-2" /> Add Contestant
                  </button>
                )}
             
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100  bg-dark text-light">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Change Voting State</h5>
                <p className="card-text">Click below to change voting state</p>
                <Link to="/admin-change-state" className="btn btn-primary">
                  <FaCog className="mr-2" /> Change State
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100  bg-dark text-light">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Contestants List</h5>
                <p className="card-text">Click below to view Contestant</p>
                <Link to="/contestant-list" className="btn btn-primary">
                  <FaList className="mr-2" /> Contestants List
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
        <div className="col-md-4 mb-4 ">
          <div className="card h-100 bg-dark text-light">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title">Calculate Result</h5>
              <p className="card-text">Click below to Calculate Result of Voting</p>
              

       
                <button onClick={handleSubmitCalculate} disabled={props.currentSateNum!==2} className="btn btn-primary">
              <FaCalculator className="mr-2" /> Calculate
            </button>
              

            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100  bg-dark text-light">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title">Show Winner</h5>
              <p className="card-text">Click below to check the Winner.</p>
              

              {props.currentSateNum===2 ? (
                <Link to="/winner" className="btn btn-primary">
                <FaAward className="mr-2" /> Show Winner
              </Link>
              ) : (
                <button className="btn btn-primary" disabled>
                <FaAward className="mr-2" /> Show Winner
                </button>
              )}


            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100  bg-dark text-light">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title">Reset Smart Contract</h5>
              <p className="card-text">Click below to Reset Contract and starting Fresh(New) Voting</p>
              <button onClick={handleSubmit} className="btn btn-primary">
              <FaSyncAlt className="mr-2" /> Reset
            </button>
            </div>
          </div>
        </div>
      </div>

      </div>
    </>
  );
}

export default AdminHome;
