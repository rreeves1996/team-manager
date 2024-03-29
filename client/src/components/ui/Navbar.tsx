import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaChevronDown, FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import AuthService from '../../utils/auth';
import useToggle from '../../hooks/useToggle';
import useAuth from '../../hooks/useAuth';

export default function Navbar() {
	const navigate = useNavigate();
	const [collapsed, toggleCollapse] = useState<boolean>();
	const isLogged = useSelector((state: any) => state.user.isLogged);
	const { logoutUser } = useAuth();

	const handleUserLogout = () => {
		try {
			logoutUser();

			AuthService.logout();
		} catch (err) {
			window.alert(`Logout failed! Error: ${err}`);
		}

		navigate(0);
	};

	return (
		<nav>
			<div className='navbar-brand'>
				<Link to={isLogged ? '/profile' : '/'} className='index-button'>
					<h3 className='brand-logo'>
						<span className='brand-text'>
							Team<span className='ez'>EZ</span>
						</span>
						<FaChalkboardTeacher className='navbar-brand-icon' />
					</h3>
				</Link>
			</div>
			<div className='navbar-links'>
				{isLogged ? (
					<Link to='/profile'>
						<div className='additional-link'>My Profile</div>
					</Link>
				) : (
					<Link to='/register'>
						<div className='additional-link'>Create Account</div>
					</Link>
				)}

				<div
					className={!collapsed ? 'navbar-toggle' : 'navbar-toggle open'}
					onClick={() => toggleCollapse(!collapsed)}>
					<FaBars className='navbar-burger' />
					<FaChevronDown className='navbar-chevron' />

					<div
						className={
							collapsed ? 'nav-link-container' : 'nav-link-container collapse'
						}>
						<Link to='/about' className='nav-button' id='about-button'>
							<div className='about-link link'>About</div>
						</Link>

						<div className='nav-button' id='contact-button'>
							<a href='https://rreeves.dev/' className='contact-link link'>
								Contact
							</a>
						</div>
						{isLogged ? (
							<Link to='' className='nav-button' id='login-button'>
								<div
									className='login-link link'
									onClick={() => handleUserLogout()}>
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
