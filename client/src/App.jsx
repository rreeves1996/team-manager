import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import InitPrompt from './pages/Init';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import About from './pages/About';
import CreateTeam from './pages/CreateTeam';

import './assets/style/style.css';

export default function App() {
	const isLogged = useSelector((state) => state.user.isLogged);

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
							isLogged || localStorage.getItem('teamID') ? (
								<Home />
							) : (
								<InitPrompt />
							)
						}
					/>
					<Route path='/profile' element={isLogged ? <Profile /> : <Login />} />
					<Route
						path='/createteam'
						element={isLogged ? <CreateTeam /> : <InitPrompt />}
					/>
					<Route path='/login' element={isLogged ? <Profile /> : <Login />} />
					<Route
						path='/register'
						element={isLogged ? <Profile /> : <Register />}
					/>
					<Route path='/about' element={<About />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}
