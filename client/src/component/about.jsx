import React from 'react';
import Main from './Main';

function about() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">

     <Main/>

      <div className="bg-white shadow-lg rounded-lg p-8 mt-10  w-4/5">
        <h1 className="text-3xl font-bold text-gray-800 text-center">About Our Project</h1>
        
        <p className="text-gray-600 mt-6 text-center">
          Welcome to VITO, a voting platform created as a college project by a team of dedicated third-year students in Electronic and Computer Science.
        </p>
        
        <h2 className="text-2xl mt-8 font-semibold text-gray-800">Our Team</h2>
        <ul className="list-disc list-inside mt-4 text-gray-600">
          <li><strong>Hardik B. Patil</strong>: </li>
          <li><strong>Piyush H. Patil</strong>: </li>
          <li><strong>Vedant A. Rana</strong>: </li>
          <li><strong>Harsh N. Raut</strong>: </li>    
        </ul>

        <h2 className="text-2xl mt-8 font-semibold text-gray-800">Technologies Used</h2>
        <p className="text-gray-600 mt-4 text-center">
          This project showcases our skills in modern web development. We used <strong>React</strong> with <strong>Vite</strong> and <strong>Tailwind CSS</strong> for the frontend, ensuring a responsive and visually appealing user interface. The backend is built with <strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB</strong>, providing a robust and scalable architecture.
        </p>

        <h2 className="text-2xl mt-8 font-semibold text-gray-800">Our Vision</h2>
        <p className="text-gray-600 mt-4 text-center">
          Our goal is to create an accessible and efficient voting system that empowers students to participate in the democratic process. We believe that every voice matters, and VITO is here to ensure that your vote counts!
        </p>
        
      </div>
    </div>
  );
}

export default about;
