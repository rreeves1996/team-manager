import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [collapsed, toggleCollapse] = useState(true);

  return (
    <nav>
      <div className="navbar-brand">
        <Link to='/' className='index-button'>
          <h3>Team<span className='ez'>EZ</span><i className="fa-solid fa-chalkboard-user navbar-brand-icon"></i></h3>
        </Link>
      </div>
      <div className={collapsed ? "navbar-toggler" : "navbar-toggler open"} onClick={() => toggleCollapse(!collapsed)}>
        <i className="fa-solid fa-bars"></i><i className="fa-solid fa-chevron-down navbar-hover-arrow"></i>
        <div className={!collapsed ? "nav-link-container" : "nav-link-container collapse"}>
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
      </div>
    </nav>
  );
}

