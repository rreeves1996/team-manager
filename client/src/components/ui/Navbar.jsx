import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiBars3 } from 'react-icons/hi2';
import { FaChalkboardTeacher, FaChevronDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import AuthService from '../../utils/auth';
import useToggle from '../../hooks/useToggle';
import useAuth from '../../hooks/useAuth';

export default function Navbar() {
	const navigate = useNavigate();
	const [collapsed, toggleCollapse] = useToggle();
	const isLogged = useSelector((state) => state.user.isLogged);
	const { logoutUser } = useAuth();

	const handleUserLogout = () => {
		logoutUser()
			.then(() => AuthService.logout())
			.finally(() => navigate(0));

		navigate('/');
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
					onClick={() => toggleCollapse()}>
					<HiBars3 className='navbar-burger' />
					<FaChevronDown className='navbar-chevron' />
					<div
						className={
							collapsed ? 'nav-link-container' : 'nav-link-container collapse'
						}>
						<Link to='/about' className='nav-button' id='about-button'>
							<div className='about-link link'>About</div>
						</Link>
						<Link to='/contact' className='nav-button' id='contact-button'>
							<div className='contact-link link'>Contact</div>
						</Link>
						{isLogged ? (
							<Link className='nav-button' id='login-button'>
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
