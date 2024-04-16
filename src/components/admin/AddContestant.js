import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaUser, FaUsers, FaBirthdayCake, FaGraduationCap } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VoterABi, VoterContractAddress } from '../contractAddress';
import { ethers } from 'ethers';

function AddContestantForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [age, setAge] = useState('');
  const [qualification, setQualification] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !party || !age || !qualification) {
      toast.error('Please fill in all fields');
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

        txn = await voteContract.addContestant(
          name,
        party,
        parseInt(age),
      qualification
        );
        console.log("Mining... please wait");
        await txn.wait();
        console.log(`Mined`);
        toast.success("Contestant saved successfully.");
        window.history.back();
   
      } else {
        toast.error(
          "Error While Saving Contestant. Please check your MetaMask connection."
        );
        console.log(`Error`);
      }
    } catch (err) {
      toast.error(
        "Error While Saving Case. Please check your MetaMask connection."
      );
      console.log(err);
    }
  
  

    setName('');
    setParty('');
    setAge('');
    setQualification('');
  
  };

  return (
    <div className='container mt-5 shadow border p-3 bg-dark text-light'>
    <Form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <Form.Group controlId="name">
            <Form.Label><FaUser /> Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group controlId="party">
            <Form.Label><FaUsers /> Party</Form.Label>
            <Form.Control type="text" placeholder="Enter party" value={party} onChange={(e) => setParty(e.target.value)} />
          </Form.Group>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <Form.Group controlId="age">
            <Form.Label><FaBirthdayCake /> Age</Form.Label>
            <Form.Control type="number" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)} />
          </Form.Group>
        </div>
        <div className="col-md-6 ">
          <Form.Group controlId="qualification">
            <Form.Label><FaGraduationCap /> Qualification</Form.Label>
            <Form.Control type="text" placeholder="Enter qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} />
          </Form.Group>
        </div>
      </div>
      <Button className='mt-4' variant="primary" type="submit">
        Add Contestant
      </Button>
    </Form>
    </div>
  );
}

export default AddContestantForm;
