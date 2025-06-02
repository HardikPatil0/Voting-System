import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function UserResult() {
  const location = useLocation();
  const { candidates: initialCandidates } = location.state || { candidates: [] };
  const [candidates, setCandidates] = useState(initialCandidates);
  const [winner, setWinner] = useState(null);
  const [isVotingStopped, setIsVotingStopped] = useState(false);


  useEffect(() => {
    const savedIsStarted = localStorage.getItem('isStarted');
    if (savedIsStarted !== null) {
      setIsVotingStopped(!JSON.parse(savedIsStarted)); 
    }
  }, []);

  
  useEffect(() => {
    const fetchCandidates = async () => {
      if (isVotingStopped && !initialCandidates.length) {
        try {
          const response = await axios.get('http://localhost:3000/candidate');
          setCandidates(response.data);
        } catch (error) {
          console.error('Error fetching candidates:', error);
        }
      }
    };

    fetchCandidates();
  }, [initialCandidates, isVotingStopped]);

  
  useEffect(() => {
    if (candidates.length > 0) {
      const maxVotesCandidate = candidates.reduce((prev, current) => {
        return Number(prev.vote) > Number(current.vote) ? prev : current;
      });
      setWinner(maxVotesCandidate);
    }
  }, [candidates]);


  if (!isVotingStopped) {
    return (
      <>
      <div className='bg-zinc-400 h-16 w-full flex justify-between items-center'>
        <h1>VITO</h1>
        <div>
          <ul>
            <li>
              <Link to="/Vote">Vote</Link>
            </li>
            <li>
              <Link to="/userresult">Result</Link>
            </li>
          </ul>
        </div>
        <h2><Link to="/">LogOut</Link></h2>
      </div>
      <div className="text-center mt-5">
        <h1 className="text-3xl font-bold">Result</h1>
        <p>Voting is still in progress. Results will be displayed after voting is stopped.</p>
      </div>
      </>
    );
  }

  return (
    <>
      <div className='bg-zinc-400 h-16 w-full flex justify-between items-center'>
        <h1 className='pl-7 text-4xl font-black text-purple-600'>VITO</h1>
        <div className='mr-14'>
          <ul className='flex text-white font-bold text-base'>
            <li className='mr-7'>
              <Link to="/home">Vote</Link>
            </li>
            <li className='ml-7'>
              <Link to="/userresult">Result</Link>
            </li>
          </ul>                                                   
        </div>
        <h2 className='pr-10 text-lg font-extralight text-blue-600' ><Link to="/">LogOut</Link></h2>
      </div>

      <div className="text-center mt-5">
        <h1 className="text-3xl font-bold">Result</h1>
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
    </>
  );
}

export default UserResult;
