import React, { useState } from "react";

export default function Register({ handlePageChange }) {
    const [formState, setFormState] = useState({ username: '', firstname: '' , lastname: '' , email: '' , password: '' });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      setFormState({
        teamname: '',
        leadname: '',
      });
    };
    
  
    return (
      <>
        <div className='container register-container'>
          <div className='banner-side'>
            <div className='brand'>
              <h1>
                Team<span className='ez'>EZ</span>
                <i className='fa-solid fa-chalkboard-user brand-icon'></i>
              </h1>
  
              <h5>Team Management</h5>
            </div>
            <div className='banner register-banner'></div>
          </div>
          <div className='form-side'>
            <h1>Register</h1>
            <h6>Enter your new account information</h6>
            <form className='form-container' onSubmit={handleFormSubmit}>
            <p className='required'>* - Optional</p>
              <div className='register-input'>
                <div className='field'>
                  <label className='label'>Your name:</label>
                  <div className='control name-control'>
                    <input
                      className='input name-input'
                      type='firstname'
                      name='firstname'
                      placeholder="First name"
                      value={formState.firstname}
                      onChange={handleChange} />
                    <input
                      className='input name-input'
                      type='lastname'
                      name='lastname'
                      placeholder="Last name"
                      value={formState.lastname}
                      onChange={handleChange} />
                  </div>
                </div>

                <div className='field'>
                  <label className='label'>*Team name:</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='teamname'
                      name='teamname'
                      placeholder="Your team's name"
                      value={formState.teamname}
                      onChange={handleChange} />
                  </div>
                </div>

                <div className='field'>
                  <label className='label'>Email address:</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='email'
                      name='email'
                      placeholder="Your email address"
                      value={formState.email}
                      onChange={handleChange} />
                  </div>
                </div>


                <div className='field'>
                  <label className='label'>Password:</label>
                  <div className='control password-control'>
                    <input
                      className='input password-input'
                      type='password'
                      name='password'
                      placeholder="8 character min."
                      value={formState.password}
                      onChange={handleChange} />
                    <input
                      className='input password-input'
                      type='passconfirm'
                      name='passconfirm'
                      placeholder="Re-enter"
                      value={formState.passconfirm}
                      onChange={handleChange} />
                  </div>
                </div>
              </div>
              
              <div className='button-container mt-4'>
                
                <button className='form-button' type='submit'>
                  Register Account
                </button>
                <div className='divider form-divider'></div>
                <div className='sub-container d-flex flex-column align-items-center mb-4'>
                  <p className='mt-1 mb-1'>Already have an account?</p>
                  <a href='/login'>Login</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
  
  