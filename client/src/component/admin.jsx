import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function admin() {

  const[email,setEmail] =useState()
  const[password,setPassword] =useState()
  const navigate = useNavigate()

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const result = await axios.post('http://localhost:3000/admin', { email, password });

    if (result.data === "success") {
      navigate("/main");
    }
  } catch (err) {
    const message = err.response?.data?.message || "Admin login failed";
    alert(message);
  }
};



  return (
    <div className='h-screen w-full bg-slate-100 flex justify-between items-center relative ' >
      <div className='bg-blue-950 h-screen w-2/5 flex flex-col justify-center items-center '>
      <h1 className='font-black text-3xl  text-white'>WELCOME !!</h1>
      <p className='text-white text-lg mt-14 ml-1'>Click here to head over to the registration page and create your account!</p>
       <Link to="/register" className='flex font-normal mb-28 mt-20 h-12 w-36 justify-center items-center border-2 border-white rounded-3xl text-lg text-white' type="submit">register</Link>
       </div>
       <br />
    <div  className=' h-screen w-3/5 flex justify-center items-center '>
    <div className='h-fit w-80 bg-white rounded-lg overflow-hidden'>
    <h1 className='flex justify-center text-lg font-bold pt-4 mb-5'>ADMIN</h1>
    <form onSubmit={handleSubmit} className='flex-col' action="">
    <label htmlFor="Email" className='pl-5 font-bold'>Email</label>
    <input  onChange={(e)=>setEmail(e.target.value)} className='flex ml-4 outline-none rounded-md pl-4 mr-3 mb-5 border-2 w-72 ' type="email" placeholder='email' name='email' />
    <label htmlFor="Password" className='pl-5 font-bold'>Password</label>
    <input  onChange={(e)=>setPassword(e.target.value)} className='flex   ml-4 outline-none rounded-md pl-4 mr-3 border-2 w-72' type="password" placeholder='password' name='password' />
    <button className='flex justify-center items-center mt-9 ml-10 mb-6 rounded-lg h-9 w-60 bg-green-400 ' type="submit">Admin</button>
    </form>
    </div>
    </div>
   
  </div>
  )
}

export default admin