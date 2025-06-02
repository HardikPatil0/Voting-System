
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import Main from './Main';
import axios from 'axios';

function Candidate({ candidates, setCandidates, setIsDisplayActive }) {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const savedIsStarted = localStorage.getItem('isStarted');
    if (savedIsStarted !== null) {
      setIsStarted(JSON.parse(savedIsStarted));
      setIsDisplayActive(JSON.parse(savedIsStarted));
    }
  }, [setIsDisplayActive]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/candidates/${id}`)
      .then(() => {
        setCandidates(prevCandidates => prevCandidates.filter(candidate => candidate._id !== id));
      })
      .catch(err => console.log('Delete request error:', err.response ? err.response.data : err.message));
  };

  const handleStartToggle = () => {
    const newIsStarted = !isStarted;
    setIsStarted(newIsStarted);
    setIsDisplayActive(newIsStarted);
    localStorage.setItem('isStarted', JSON.stringify(newIsStarted));

    if (!newIsStarted) {
      alert('Voting stopped! You can now view results.');
      navigate('/results');
    }
  };

  return (
    <>
      <Main />
      <div className='h-auto w-full flex justify-center text-center mt-11'>
        <div className='bg-white h-auto w-11/12'>
          <h1 className='font-extrabold text-cyan-600 pt-5'>Candidates</h1>
          <div className='flex justify-between'>
            <div className='flex justify-end pl-5 mb-4 pr-5'>
              <button
                onClick={handleStartToggle}
                className={`${isStarted ? 'bg-red-500' : 'bg-green-500'} mr-8 text-white font-bold py-2 px-4 rounded`}>
                {isStarted ? 'Stop' : 'Start'}
              </button>
              <Link
                to={{
                  pathname: '/userresult',
                  state: { candidates }
                }}
                className='bg-blue-500 text-white font-bold py-2 px-4 rounded'>
                Result
              </Link>
            </div>
            <div className='flex justify-end mb-4 pr-5'>
              <Link
                to='/addnew'
                className='bg-green-500 text-white font-bold py-2 px-4 rounded'>
                Add
              </Link>
            </div>
          </div>

          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 px-4 py-2'>Candidate ID</th> 
                <th className='border border-gray-300 px-4 py-2'>Name</th>
                <th className='border border-gray-300 px-4 py-2'>Address</th>
                <th className='border border-gray-300 px-4 py-2'>Email</th>
                <th className='border border-gray-300 px-4 py-2'>Stand For</th>
                <th className='border border-gray-300 px-4 py-2'>Contact</th>
                <th className='border border-gray-300 px-4 py-2'>Vote</th>
                <th className='border border-gray-300 px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length > 0 ? (
                candidates.map((candidate, index) => (
                  <tr key={index}>
                    <td className='border border-gray-300 px-4 py-2'>{candidate.candidateId}</td>
                    <td className='border border-gray-300 px-4 py-2'>{candidate.name}</td>
                    <td className='border border-gray-300 px-4 py-2'>{candidate.address}</td>
                    <td className='border border-gray-300 px-4 py-2'>{candidate.email}</td>
                    <td className='border border-gray-300 px-4 py-2'>{candidate.standfor}</td>
                    <td className='border border-gray-300 px-4 py-2'>{candidate.contact}</td>
                    <td className='border border-gray-300 px-4 py-2'>
                      <span>{candidate.vote}</span>
                    </td>
                    <td className='border border-gray-300 px-4 py-2 flex justify-around'>
                      <Link to={`/update/${candidate._id}`} className='text-blue-500 p-3 hover:text-blue-700'>
                        <BsPencilFill />
                      </Link>
                      <button onClick={() => handleDelete(candidate._id)} className='text-red-500 hover:text-red-700'>
                        <BsFillTrashFill />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className='border border-gray-300 px-4 py-2'>No candidates added</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Candidate;
