import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiBars3 } from 'react-icons/hi2';
import { FaChalkboardTeacher, FaChevronDown } from 'react-icons/fa';
import { useAppContext } from '../utils/GlobalState';
import Auth from '../utils/auth';

export default function Navbar() {
	const [collapsed, setCollapsed] = useState(true);
	const [state, dispatch] = useAppContext();

	return (
		<nav>
			<div className='navbar-brand'>
				<Link to={state.isLoggedIn ? '/profile' : '/'} className='index-button'>
					<h3 className='brand-logo'>
						<span className='brand-text'>
							Team<span className='ez'>EZ</span>
						</span>
						<FaChalkboardTeacher className='navbar-brand-icon' />
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
					className={collapsed ? 'navbar-toggle' : 'navbar-toggle open'}
					onClick={() => setCollapsed(!collapsed)}>
					<HiBars3 className='navbar-burger' />
					<FaChevronDown className='navbar-chevron' />
					<div
						className={
							!collapsed ? 'nav-link-container' : 'nav-link-container collapse'
						}>
						<Link to='/about' className='nav-button' id='about-button'>
							<div className='about-link link'>About</div>
						</Link>
						<Link to='/contact' className='nav-button' id='contact-button'>
							<div className='contact-link link'>Contact</div>
						</Link>
						{state.isLoggedIn ? (
							<Link className='nav-button' id='login-button'>
								<div className='login-link link' onClick={Auth.logout}>
									Logout
								</div>
							</Link>
						) : (
							<Link to='/login' className='nav-button' id='login-button'>
								<div className='login-link link'>Login</div>
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
