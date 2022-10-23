import React, { useState } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer';
import About from './components/About';
import InitPrompt from './components/InitPrompt';
import Background from './assets/banner.jpg';
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
        {renderPage()}
      </main>
      <Footer />
    </>
  );
}

