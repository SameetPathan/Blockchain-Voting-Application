import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import DashboardHeading from './DashboardHeading';
import { ethers } from 'ethers';
import { VoterABi, VoterContractAddress } from './contractAddress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WinnerList() {
  const [winner, setWinner] = useState(null);

  const getWinnerDetails = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contestContract = new ethers.Contract(VoterContractAddress, VoterABi, signer);
        const result = await contestContract.getWinnerDetails();
        const [id, name, voteCount, party, age, qualification] = result;
        const winnerData = {
          id: id.toString(),
          name: name.toString(),
          voteCount: voteCount.toString(),
          party: party.toString(),
          age: age.toString(),
          qualification: qualification.toString()
        };
        setWinner(winnerData);
      } else {
        toast.error('Please install MetaMask to access this feature.');
      }
    } catch (error) {
      console.error('Error fetching winner details:', error);
      toast.error('Winner details could not be retrieved.');
    }
  };

  useEffect(() => {
    getWinnerDetails();
  }, []);

  return (
    <>
  <DashboardHeading text={"Winner Details"} />
  <div className="container-fluid mt-5 mb-5">
    {winner ? (
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <Card className="shadow-sm bg-dark text-light">
            <Card.Body>
            <div class="alert alert-success" role="alert">
             Winner!
            </div>
              <Card.Title className='text-success'>{winner.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">ID: {winner.id}</Card.Subtitle>
              <Table>
                <tbody className='text-light'>
                  <tr>
                    <td className='text-light'>Vote Count:</td>
                    <td className='text-light'>{winner.voteCount}</td>
                  </tr>
                  <tr>
                    <td className='text-light'>Party:</td>
                    <td className='text-light'>{winner.party}</td>
                  </tr>
                  <tr>
                    <td>Age:</td>
                    <td>{winner.age}</td>
                  </tr>
                  <tr>
                    <td>Qualification:</td>
                    <td>{winner.qualification}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    ) : (
      <div className="text-center">Winner details are loading...</div>
    )}
  </div>
</>

  );
}

export default WinnerList;
