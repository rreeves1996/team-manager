import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login({ handlePageChange }) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const userEmail = formState.email.trim();
    const userPassword = formState.password.trim();

    if (userEmail && userPassword) {
      await axios
        .put('/api/users/login', {
          email: userEmail,
          password: userPassword,
        })
        .then((res) => {
          console.log('Login successful!');

          navigate('/', { replace: true });
        })
        .catch((err) => console.log(`Failed to login: ${err}`));
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <div className='container login-container'>
        <div className='form-side'>
          <h1>Sign In</h1>
          <h6>Enter your account information to continue</h6>
          <form className='form-container' onSubmit={handleFormSubmit}>
            <div className='login-input'>
              <div className='field'>
                <label className='label'>Email:</label>
                <div className='control'>
                  <input
                    className='input'
                    type='email'
                    name='email'
                    placeholder='Your email'
                    autoComplete='off'
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='field'>
                <label className='label'>Password:</label>
                <div className='control'>
                  <input
                    className='input'
                    type='password'
                    name='password'
                    placeholder='Your password'
                    autoComplete='off'
                    value={formState.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className='button-container'>
              <button className='form-button' type='submit'>
                Login
              </button>
              <div className='divider form-divider'></div>
              <div className='sub-container d-flex flex-column align-items-center mb-4'>
                <p className='mt-1 mb-1'>Want to create a new account?</p>
                <a href='#'>Register</a>
              </div>
            </div>
          </form>
        </div>
        <div className='banner-side'>
          <div className='brand'>
            <h1>
              Team<span className='ez'>EZ</span>
              <i className='fa-solid fa-chalkboard-user brand-icon'></i>
            </h1>

            <h5>Team Management</h5>
          </div>
          <div className='banner'></div>
        </div>
      </div>
    </>
  );
}