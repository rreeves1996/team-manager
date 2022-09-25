import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <div className="navbar-brand">
        <Link to='/' className='index-button'>
          <i class="fa-solid fa-bong"></i>
        </Link>
      </div>
      <div className="nav-link-container">
        <Link to='/about' className='about-button'>
          <div className='about-link'>About</div>
        </Link>
        <Link to='/contact' className='contact-button'>
          <div className='contact-link'>Contact</div>
        </Link>
        <Link to='/login' className='login-button'>
          <div className='login-link'>Login</div>
        </Link>
      </div>
    </nav>
  );
}

