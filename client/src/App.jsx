import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InitPrompt from './components/InitPrompt';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import About from './components/About';

import './assets/style/style.css';

export default function App() {
	return (
		<>
			<Navbar />
			<main>
				<div className='mobile-background-container'>
					<div className='mobile-background'></div>
				</div>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/init' element={<InitPrompt />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/about' element={<About />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}
