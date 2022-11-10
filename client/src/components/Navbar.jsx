import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../utils/GlobalState';
import Auth from '../utils/auth';

export default function Navbar() {
	const [collapsed, toggleCollapse] = useState(true);
	const [state, dispatch] = useAppContext();

	return (
		<nav>
			<div className='navbar-brand'>
				<Link
					to={
						state.isLoggedIn || localStorage.getItem('teamID') ? '/' : '/init'
					}
					className='index-button'>
					<h3 className='brand-logo'>
						<span className='brand-text'>
							Team<span className='ez'>EZ</span>
						</span>
						<i className='fa-solid fa-chalkboard-user navbar-brand-icon'></i>
					</h3>
				</Link>
			</div>
			<div className='navbar-links'>
				{state.isLoggedIn ? (
					<Link to='/profile'>
						<div className='register-link'>My Profile</div>
					</Link>
				) : (
					<Link to='/register'>
						<div className='register-link'>Create Account</div>
					</Link>
				)}
				<div
					className={collapsed ? 'navbar-toggler' : 'navbar-toggler open'}
					onClick={() => toggleCollapse(!collapsed)}>
					<i className='fa-solid fa-bars'></i>
					<i className='fa-solid fa-chevron-down navbar-hover-arrow'></i>
					<div
						className={
							!collapsed ? 'nav-link-container' : 'nav-link-container collapse'
						}>
						<Link to='/about' className='nav-button' id='about-button'>
							<div className='about-link'>About</div>
						</Link>
						<Link to='/contact' className='nav-button' id='contact-button'>
							<div className='contact-link'>Contact</div>
						</Link>
						{state.isLoggedIn ? (
							<Link className='nav-button' id='login-button'>
								<div className='login-link' onClick={Auth.logout}>
									Logout
								</div>
							</Link>
						) : (
							<Link to='/login' className='nav-button' id='login-button'>
								<div className='login-link'>Login</div>
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
