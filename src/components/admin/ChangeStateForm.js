import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { VoterABi, VoterContractAddress } from '../contractAddress';


function ChangeStateForm(props) {
  const [selectedState, setSelectedState] = useState(props.currentSateNum);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedState) {
      alert('Please select a state');
      return;
    }
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(VoterContractAddress, VoterABi, signer);
        let txn;

        txn = await voteContract.changeState(parseInt(selectedState));
        console.log("Mining... please wait");
        await txn.wait();
        console.log(`Mined`);
        toast.success("state Updation Completed.");
        
        setSelectedState('');
        window.history.back();
   
      } else {
        toast.error(
          "state Updation Failed."
        );
        console.log(`Error`);
      }
    } catch (err) {
      toast.error(
        "state Updation Failed."
      );
      console.log(err);
    }
  
  };

  return (
    <div className='container mt-5 shadow border p-3 bg-dark text-light'>
 
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="stateSelect">
        <Form.Label>Select State: </Form.Label>
        <Form.Control as="select" onChange={handleStateChange} value={selectedState}>
          <option value="SELECT">Select State</option>
          <option value="0">Registration</option>
          <option value="1">Voting</option>
          <option value="2">Declare Result</option>
        </Form.Control>
      </Form.Group>
      <Button className='mt-3' variant="info" type="submit">
        Change State
      </Button>
    </Form>
    </div>
  );
}

export default ChangeStateForm;
