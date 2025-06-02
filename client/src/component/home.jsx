import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home({ candidates, setCandidates }) {
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [isDisplayActive, setIsDisplayActive] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [canVote, setCanVote] = useState(true); 

  useEffect(() => {
    const storedVote = sessionStorage.getItem('votedCandidate');
    if (storedVote) {
      setVotedCandidate(storedVote);
      setCanVote(false); 
    }

    const votingState = localStorage.getItem('isStarted');
    if (votingState !== null) {
      setIsDisplayActive(JSON.parse(votingState));
    }

    const loggedInUser = localStorage.getItem('isLoggedIn');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  
  const resetVotingState = () => {
    setVotedCandidate(null); 
    setCanVote(true); 
  };

  const handleVote = (id) => {
    console.log('Trying to vote for candidate:', id);
    console.log('Voted Candidate:', votedCandidate);
    console.log('Is Display Active:', isDisplayActive);
    console.log('Is Logged In:', isLoggedIn);

  
    axios.put(`http://localhost:3000/candidate/vote/${id}`)
      .then((response) => {
          console.log('Vote response:', response.data);
          setCandidates(prevCandidates => 
              prevCandidates.map(candidate =>
                  candidate._id === id ? { ...candidate, vote: candidate.vote + 1 } : candidate
              )
          );

          setVotedCandidate(id);
          sessionStorage.setItem('votedCandidate', id);
          setCanVote(false); 
      })
      .catch(err => console.error('Error voting:', err.response ? err.response.data : err.message));
  };

  return (
    <>
      <div className='bg-zinc-400 h-16 w-full flex justify-between items-center'>
        <h1 className='pl-7 text-4xl font-black text-purple-600'>VITO</h1>
        <div className='mr-14'>
          <ul className='flex text-white font-bold text-base'>
            <li className='mr-7'>
              <Link to="/home">Vote</Link>
            </li>

            <li className='mr-7'>
              <Link to="/userresult">Result</Link>
            </li>
          </ul>
        </div>
        <h2 className='pr-10 text-lg font-extralight text-blue-600'><Link to="/" onClick={resetVotingState}>LogOut</Link></h2>  
      </div>
      <div className='h-auto w-full flex justify-center text-center mt-11'>
        <div className='bg-white h-auto w-11/12'>
          <h1 className='font-extrabold text-cyan-600 pt-5'>Vote Your Leader</h1>
          {isDisplayActive ? (
            <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='border border-gray-300 px-4 py-2'>ID</th>
                  <th className='border border-gray-300 px-4 py-2'>Name</th>
                  <th className='border border-gray-300 px-4 py-2'>Address</th>
                  <th className='border border-gray-300 px-4 py-2'>Stand For</th>
                  <th className='border border-gray-300 px-4 py-2'>Vote</th>
                </tr>
              </thead>
              <tbody>
                {candidates.length > 0 ? (
                  candidates.map((candidate, index) => (
                    <tr key={index}>
                      <td className='border border-gray-300 px-4 py-2'>{candidate._id}</td>
                      <td className='border border-gray-300 px-4 py-2'>{candidate.name}</td>
                      <td className='border border-gray-300 px-4 py-2'>{candidate.address}</td>
                      <td className='border border-gray-300 px-4 py-2'>{candidate.standfor}</td>
                      <td className='border border-gray-300 px-4 py-2'>
                        <button 
                            onClick={() => handleVote(candidate._id)} 
                            disabled={!canVote} 
                            className={`py-1 px-2 rounded ${!canVote ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
                        >
                            {votedCandidate === candidate._id ? 'Voted' : 'Vote'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className='border border-gray-300 px-4 py-2'>No candidates added</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <p className='text-gray-600'>Data is not currently displayed.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
