import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useWindowResize from './hooks/useWindowResize';
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
	const isLogged = useSelector((state) => state.user.isLogged);
	const { width } = useWindowResize();

	return (
		<>
			<Navbar />
			<main>
				{width < 768 ? (
					<div className='mobile-background-container'>
						<div className='mobile-background'></div>
					</div>
				) : (
					<></>
				)}
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
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/about' element={<About />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}
