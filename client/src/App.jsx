import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import InitPrompt from './components/InitPrompt';
import Home from './components/Home'
import Register from './components/Register';
import Login from './components/Login'
import './assets/style/style.css';



export default function App() {
  const [page, changePage] = useState(() => {
    if(localStorage.getItem("teamID")) {
      return "Home";
    } else {
      return "Init";
    }
  });


  const renderPage = () => {
    switch(page) {
      case "Init":
          return <InitPrompt page={page} handlePageChange={handlePageChange} />;
      case "Home":
        return <Home handlePageChange={handlePageChange} />;
      default:
        return <Home handlePageChange={handlePageChange} />
    }
  }

  const handlePageChange = (page) => changePage(page);

  return (
    <>
        <Navbar />
        <main>
          <div className="mobile-background-container">
            <div className='mobile-background'></div>
          </div>
          <Routes>
            <Route path='/' element={localStorage.getItem("teamID") ? <Home /> : <InitPrompt />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </main>
        <Footer />
    </>
  );
}

