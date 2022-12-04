import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppContext } from './utils/GlobalState';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import InitPrompt from './pages/Init';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import About from './pages/About';

import './assets/style/style.css';

export default function App() {
	const [state, dispatch] = useAppContext();

	return (
		<>
			<Navbar />
			<main>
				<div className='mobile-background-container'>
					<div className='mobile-background'></div>
				</div>
				<Routes>
					<Route
						path='/'
						element={
							state.isLoggedIn || localStorage.getItem('teamID') ? (
								<Home />
							) : (
								<InitPrompt />
							)
						}
					/>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route
						path='/profile'
						element={state.isLoggedIn ? <Profile /> : <Register />}
					/>
					<Route path='/about' element={<About />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}
