import './App.css';
import React from 'react';
import { useState,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import ForceLogin from './components/ForceLogin';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import UserHandler from './components/UserHandler';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfileForm from './components/UserProfileForm';
import { ethers } from "ethers";
import { VoterABi, VoterContractAddress, profileABI, profileAddress } from './components/contractAddress';
import AddContestantForm from './components/admin/AddContestant';
import AdminHome from './components/admin/AdminHome';
import ChangeStateForm from './components/admin/ChangeStateForm';
import ContestantList from './components/ContestantList';
import UserHome from './components/users/UserHome';
import WinnerList from './components/WinnerList';



 
function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentBalance, setCurrentBalanace] = useState(null);
  const [userDetails, setuserDetails] = useState([]);
  const [account, setAccount] = useState(null);
  const [currentCase, setcurrentCase] = useState("");
  const [currentCaseName, setcurrentCaseName] = useState("");
  const [currentSate, setcurrentSate] = useState("");
  const [currentSateNum, setcurrentSatecurrentSateNum] = useState("");

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

        if(isprofile){
          const profile = await ProfileContract.getProfileById(accounts[0]);
          setuserDetails(profile)
          //setUserProfile(profile);
        }else{
          //setUserProfile([]);
        }
        
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetProfile();
    getstate();
  }, []);

  const getstate = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contestContract = new ethers.Contract(VoterContractAddress, VoterABi, signer);
        const result = await contestContract.getCurrentState();
        setcurrentSatecurrentSateNum(result);
        if(result == 0){
          setcurrentSate("Registration Started and Contestants are been added");
        }
        if(result == 1){
          setcurrentSate("Registration Closed and Voting Started");
        }
        if(result == 2){
          setcurrentSate("Voting Ended and Result Declared");
        }
        console.log("state:",result)
      } 
    } catch (error) {
      console.error('Error fetching state:', error);
    }
  };


  return <>
  <div>

    <div className="App" >
        
       

          {currentAccount?
            <Router>
         
            
            <Navbar currentSate={currentSate} userDetails={userDetails} setCurrentAccount={setCurrentAccount} setCurrentBalanace={setCurrentBalanace} currentAccount={currentAccount} currentBalance={currentBalance}></Navbar>
            
            <div>
           
              <Routes> 
               
                 <Route exact path='/' element={ <UserHandler setuserDetails={setuserDetails} userDetails={userDetails}></UserHandler>}></Route>
                 <Route exact path='/profile' element={<UserProfileForm ></UserProfileForm>}></Route>
                 <Route exact path='/user-home' element={<UserHome currentSateNum={currentSateNum}></UserHome>}></Route>

                 
                 <Route exact path='/admin-home' element={<AdminHome currentSateNum={currentSateNum}></AdminHome>}></Route>
                 <Route exact path='/admin-add-contestant' element={<AddContestantForm></AddContestantForm>}></Route>
                 <Route exact path='/admin-change-state' element={<ChangeStateForm currentSateNum={currentSateNum}></ChangeStateForm>}></Route>

                 <Route exact path='/contestant-list' element={<ContestantList></ContestantList>}></Route>

                 <Route exact path='/winner' element={<WinnerList></WinnerList>}></Route>
                 

              </Routes>
            </div>
          
              
            <Footer></Footer>
    
          </Router>
           
          :
          <Router>
              <Navbar setCurrentAccount={setCurrentAccount} setCurrentBalanace={setCurrentBalanace} currentAccount={currentAccount} currentBalance={currentBalance}></Navbar>
              <>
                <Routes> 
                  <Route exact path='/' element={<ForceLogin></ForceLogin>}></Route>
                  <Route exact path='*' element={<ForceLogin></ForceLogin>}></Route>
                </Routes>
              </>
                <Footer></Footer>
              </Router>
            
        }
        <ToastContainer />
        </div>
        </div>
  
  </>;
}

export default App;






