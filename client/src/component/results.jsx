import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import Main from './Main';

function Results() {
  const [candidates, setCandidates] = useState([]); 
  const [winner, setWinner] = useState(null);
  const [isVotingStopped, setIsVotingStopped] = useState(false);

 
  useEffect(() => {
    const savedIsStarted = localStorage.getItem('isStarted');
    if (savedIsStarted !== null) {
      setIsVotingStopped(!JSON.parse(savedIsStarted)); 
    }
  }, []);

  
  useEffect(() => {
    if (isVotingStopped) {
      const fetchCandidates = async () => {
        try {
          const response = await axios.get('http://localhost:3000/candidate');
          setCandidates(response.data);
        } catch (error) {
          console.error('Error fetching candidates:', error);
        }
      };

      fetchCandidates();
    }
  }, [isVotingStopped]);

  
  useEffect(() => {
    if (candidates.length > 0) {
      const maxVotesCandidate = candidates.reduce((prev, current) => {
        return Number(prev.vote) > Number(current.vote) ? prev : current;
      });
      setWinner(maxVotesCandidate);
    } else {
      setWinner(null); 
    }
  }, [candidates]);

  if (!isVotingStopped) {
    return (
    <>
    <Main/>
    <div className="text-center mt-5">Voting is still in progress.</div>;
    </>
    );
  }

  return (
    <>
    
      <Main />

     
      <div className="text-center mt-5">
        <h1 className="text-3xl font-bold">Results</h1>
        {winner ? (
          <div className="mt-5">
            <h2 className="text-2xl">Winner: {winner.name}</h2>
            <p>ID: {winner._id}</p>
            <p>Address: {winner.address}</p>
            <p>Email: {winner.email}</p>
            <p>Stand For: {winner.standfor}</p>
            <p>Contact: {winner.contact}</p>
            <p>Votes: {winner.vote}</p>
          </div>
        ) : (
          <p>No candidates available</p>
        )}
      </div>

    
      <div className="text-center mt-5">
        <h2 className="text-2xl">All Candidates</h2>
        {candidates.length > 0 ? (
          <ul>
            {candidates.map(candidate => (
              <li key={candidate._id} className="mt-3">
                <p>Name: {candidate.name}</p>
                <p>Votes: {candidate.vote}</p>
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <p>No candidates to display</p>
        )}
      </div>
    </>
  );
}

export default Results;
