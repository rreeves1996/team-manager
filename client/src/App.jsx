import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer';
import About from './components/About';


import './assets/style/style.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

