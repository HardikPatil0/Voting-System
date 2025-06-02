import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import login from './login'

function signup() {
 
  const[name,setName] =useState()
  const[email,setEmail] =useState()
  const[password,setPassword] =useState()
  const navigate = useNavigate()

  const handleSubmit = (e)=>{ 
    e.preventDefault()
    axios.post('http://localhost:3000/register',{name,email,password})
    .then(result => {console.log(result)
      navigate("/home")
    })
    .catch(err => console.log(err))
  }

  return (
    <>
    <div className='h-screen w-full bg-slate-400 flex justify-between items-center relative ' >
      <div className=' h-screen w-3/5 flex justify-center items-center  bg-slate-100 '>
        <div className='h-fit w-80 bg-white rounded-lg overflow-hidden'>
        <h1 className='flex justify-center text-lg font-bold pt-4 mb-5'>REGISTER</h1>
      <form onSubmit={handleSubmit} className='flex-col' action="">
      <label htmlFor="Name" className='pl-5 font-bold'>Name</label>
            <input
           className='flex ml-4 outline-none rounded-md pl-4 mr-3 mb-5 border-2 w-72 ' type="text" placeholder='name' name='name' />
              <label htmlFor="Email" className='pl-5 font-bold'>Email</label>
      <input 
         onChange={(e)=>setEmail(e.target.value)}
         className='flex ml-4 outline-none rounded-md pl-4 mr-3 mb-5 border-2 w-72 '  type="email" placeholder='email' name='email' />
       <label htmlFor="Password" className='pl-5 font-bold'>Password</label>
      <input 
         onChange={(e)=>setPassword(e.target.value)}
         className='flex   ml-4 outline-none rounded-md pl-4 mr-3 border-2 w-72' type="password" placeholder='password' name='password' />
      
      <button  className='flex justify-center items-center mt-9 ml-10 mb-6 rounded-lg h-9 w-60 bg-green-400 ' type="submit">Register</button>
      </form>
      <h1 className='font-bold text-lg w-full flex justify-center'>OR</h1>
      <Link to="/"  className='flex justify-center items-center mt-5 ml-10 mb-6 rounded-lg h-9 w-60 bg-green-400 ' type="submit">login</Link>
      </div>
      </div>
      <br />
      <div className='bg-blue-950 h-screen w-2/5 flex flex-col justify-center items-center '>
      <h1 className='font-black text-3xl  text-white'>WELCOME ADMIN !!</h1>
      <p className='text-white text-lg mt-14 ml-10'>Manage and oversee the voting process seamlessly.Ensure a fair and transparent voting experience! with this make new one.</p>
      <Link to="/admin" className='flex font-normal mb-28 mt-20 h-12 w-36 justify-center items-center border-2 border-white rounded-3xl text-lg text-white' type="submit">admin</Link>
      </div>
    </div>
  
    </>
  )
}

export default signup