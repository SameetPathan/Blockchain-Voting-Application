import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import DashboardHeading from './DashboardHeading';
import { ethers } from 'ethers';
import { VoterABi, VoterContractAddress } from './contractAddress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContestantList() {
  const [contestants, setContestants] = useState([]);

  const getAllContestants = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contestContract = new ethers.Contract(VoterContractAddress, VoterABi, signer);
        const result = await contestContract.getAllContestants();
        const [ids, names, voteCounts, parties, ages, qualifications] = result;
        const contestantsData = ids.map((id, index) => ({
          id: id.toString(),
          name: names[index].toString(),
          voteCount: voteCounts[index].toString(),
          party: parties[index].toString(),
          age: ages[index].toString(),
          qualification: qualifications[index].toString()
        }));
        setContestants(contestantsData);
      } else {
        toast.error('Please install MetaMask to access this feature.');
      }
    } catch (error) {
      console.error('Error fetching contestants:', error);
      toast.error('Error fetching contestants. Please try again later.');
    }
  };

  const handleVote = async (id) => {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(VoterContractAddress, VoterABi, signer);
        let txn;

        txn = await voteContract.vote(id);
        console.log("Mining... please wait");
        await txn.wait();
        console.log(`Mined`);
        toast.success("Voted.");
        window.history.back();
   
      } else {
        toast.error(
          "Vote Failed. May voting has not started or already voted"
        );
        console.log(`Error`);
      }
    } catch (err) {
      toast.error(
        "Vote Failed. May voting has not started. May voting has not started or already voted"
      );
      console.log(err);
    }
  };

  useEffect(() => {
    getAllContestants();
  }, []);

  return (
    <>
      <DashboardHeading text={"Contestants List"} />
      <div className="container mt-5 mb-5">
        <div className="row">
          {contestants.map((contestant, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <Card className="shadow-sm bg-dark text-light">
                <Card.Body>
                  <Card.Title>{contestant.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted className='text-light'">ID: {contestant.id}</Card.Subtitle>
                  <Table>
                    <tbody className='text-light'>
                      <tr>
                        <td className='text-light'>Vote Count:</td>
                        <td className='text-light'>{contestant.voteCount}</td>
                      </tr>
                      <tr>
                        <td className='text-light'>Party:</td>
                        <td className='text-light'>{contestant.party}</td>
                      </tr>
                      <tr>
                        <td>Age:</td>
                        <td>{contestant.age}</td>
                      </tr>
                      <tr>
                        <td>Qualification:</td>
                        <td>{contestant.qualification}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button variant="primary" onClick={() => handleVote(contestant.id)}>Vote</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ContestantList;
