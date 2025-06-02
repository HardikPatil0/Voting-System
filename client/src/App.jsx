import { useState, useEffect } from 'react';
import './App.css';
import Signup from './component/signup';
import Login from './component/login';
import Admin from './component/admin';
import Home from './component/home';
import Main from './component/Main';
import Candidate from './component/candidate';
import About from './component/about';
import Addnew from './component/addnew';
import Update from './component/update';
import Result from './component/userresult';
import Results from './component/results';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [isDisplayActive, setIsDisplayActive] = useState(false); 

  useEffect(() => {
   
    axios.get('http://localhost:3000/candidate')
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('Error fetching candidates:', error);
      });
  }, []);

  const addCandidate = (newCandidate) => {
    setCandidates(prevCandidates => [...prevCandidates, newCandidate]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/admin' element={<Admin />} />
        <Route 
          path='/home' 
          element={<Home 
                      candidates={candidates} 
                      setCandidates={setCandidates} 
                      isDisplayActive={isDisplayActive} 
                    />} 
        />
        <Route 
          path='/candidate' 
          element={<Candidate 
                      candidates={candidates} 
                      setCandidates={setCandidates} 
                      setIsDisplayActive={setIsDisplayActive} 
                    />} 
        />
        <Route path='/main' element={<Main />} />
        <Route path='/userresult' element={<Result />} />
        <Route path='/results' element={<Results />} />
        <Route path='/about' element={<About />} />
        <Route path='/addnew' element={<Addnew addCandidate={addCandidate} />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
