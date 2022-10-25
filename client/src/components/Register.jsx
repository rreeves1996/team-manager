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
          <div className='form-side'>
            <h1>Register</h1>
            <h6>Enter your new account information:</h6>
            <form className='form-container' onSubmit={handleFormSubmit}>
              <div className='init-input'>
                <div className='field'>
                  <label className='label'>Team Name</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='teamname'
                      placeholder="Your team or company's name"
                      name='teamname'
                      value={formState.teamname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
  
                <div className='field'>
                  <label className='label'>Team Lead's Name</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='leadname'
                      name='leadname'
                      placeholder="Your team's manager"
                      value={formState.leadname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
  
              <div className='init-button-container'>
                <button className='init-button' type='submit'>
                  Generate Team
                </button>
                <div className='divider init-divider'></div>
                <div className='sub-container d-flex flex-column align-items-center mb-3'>
                  <p className='mt-1 mb-1'>Already have an account?</p>
                  <a href='/login'>Login</a>
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
  
  