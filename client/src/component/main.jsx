import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function nav() {
  return (
    <>
    <div className='bg-zinc-400 h-16 w-full flex justify-between items-center' >
      <h1 className='pl-7 text-4xl font-black text-purple-600'>VITO</h1>
      <div className='mr-14'>
        <ul className='flex text-white font-bold text-base'>
          <li className='mr-7'>
            <Link to="/candidate">Candidate</Link>
          </li>
          <li className='mr-7'>
            <Link to="/about">About</Link>
          </li>
          <li className='mr-7'>
            <Link to="/results">Result</Link>
          </li>
        </ul>
      </div>
    <h2  className='pr-10 text-lg font-extralight text-blue-600'>  <Link to="/">LogOut</Link> </h2>  
   
    </div>
    
    </>
  )
}

export default nav