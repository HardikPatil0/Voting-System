
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Addnew({ addCandidate }) {
  const [formData, setFormData] = useState({
    candidateId: '', 
    name: '',
    address: '',
    email: '',
    standfor: '',
    contact: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    
    axios.post('http://localhost:3000/candidate', formData)
      .then(result => {
        console.log(result);
        addCandidate(formData);  
        navigate('/candidate');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='h-screen w-full flex justify-center text-center mt-14'>
      <div className='bg-zinc-700 h-fit w-96 rounded-md'>
        <h1 className='font-extrabold text-cyan-600 pt-5 mb-8'>ADD THE CANDIDATE</h1>
        <form className='flex-col flex-wrap gap-1 justify-center text-center' onSubmit={handleSubmit} action='post'>
        <label htmlFor="ID" className=' font-bold mr-52'>CANDIDATE ID</label>
          <input
          className='flex ml-4 h-9 outline-none rounded-md pl-4 mr-3 mb-5 border-2 w-11/12 '
            type='number'
            placeholder='Candidate ID' 
            name='candidateId' 
            onChange={handleChange}
          />
          <label htmlFor="name" className='pl-5 font-bold mr-72'>NAME</label>
          <input
          className='flex ml-4 h-9 outline-none rounded-md pl-4 mr-3 mb-5 border-2 w-11/12 '
            type='text'
            placeholder='Enter name'
            name='name'
            onChange={handleChange}
          />
          <label htmlFor="ID" className='pl-5 mr-72 font-bold'>EMAIL</label>
          <input
          className='flex ml-4 h-9 outline-none rounded-md pl-4 mr-3 mb-5 border-2 w-11/12 '
            type='email'
            placeholder='Enter email'
            name='email'
            onChange={handleChange}
          />
          <label htmlFor="address" className='pl-5 mr-64 font-bold'>ADDRESS</label>
          <input
          className='flex ml-4 h-9 outline-none rounded-md pl-4 mr-3 mb-5 border-2 w-11/12 '
            type='text'
            placeholder='Enter Address'
            name='address'
            onChange={handleChange}
          />
          <label htmlFor="standfor" className='pl-5 mr-64 font-bold'>STANDFOR</label>
          <input className='flex ml-4 h-9 outline-none rounded-md pl-4 mr-3 mb-5 border-2 w-11/12 ' type="text" placeholder='Post' name='standfor' onChange={handleChange} />
          <label htmlFor="contact" className='pl-5 mr-64 font-bold'>CONTACT</label>
          <input
          className='flex ml-4 h-9 outline-none rounded-md pl-4 mr-3 mb-5 border-2 w-11/12 '
            type='tel'
            placeholder='Enter contact number'
            name='contact'
            onChange={handleChange}
          />
          <button type='submit' className='flex justify-center items-center mt-9 ml-16 mb-6 rounded-lg font-bold text-white h-9 w-60 bg-blue-600 ' >Add</button>
        </form>
      </div>
    </div>
  );
}

export default Addnew;
