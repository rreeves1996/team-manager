import React, { useState } from 'react';
import Banner from "../assets/banner.jpg";

export default function InitPrompt({ handlePageChange }) {
  const [formState, setFormState] = useState({ teamname: '', leadname: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formState);

    let team_name = formState.teamname.trim();
    let name = formState.leadname.trim();

    if (team_name && name) {
      const fetchReq1 = fetch('/api/teams', {
        method: 'POST',
        body: JSON.stringify({ team_name }),
        headers: { 'Content-Type': 'application/json' }
      }).then((res) => res.json());
      const fetchReq2 = fetch('/api/managers', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' }
      }).then((res) => res.json());
      const requests = Promise.all([fetchReq1, fetchReq2])
      const response = requests;

      if (response.ok) {
        handlePageChange("Home");
      } else {
        alert(response.statusText);
      }
    } else if (!team_name || !name) {
      team_name = 'The Seattle Puddlechickens';
      name = 'Qweet Farrol';

      const fetchReq1 = fetch('/api/teams', {
        method: 'POST',
        body: JSON.stringify({ team_name }),
        headers: { 'Content-Type': 'application/json' }
      }).then((res) => res.json());
      const fetchReq2 = fetch('/api/managers', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' }
      }).then((res) => res.json());
      const requests = Promise.all([fetchReq1, fetchReq2])
      const response = requests;

      if (response.ok) {
        handlePageChange("Home");
      } else {
        alert(response.statusText);
      }
    }

    setFormState({
      teamname: '',
      leadname: '',
    });

    handlePageChange('Home');
  };

  return (
    <>
      <div className='container init-container'>
        <div className='form-side'>
          <h1>Welcome!</h1>
          <h6>Enter team information to continue:</h6>
          <form className='init-form' onSubmit={handleFormSubmit}>
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
              <div className='sub-container d-flex flex-column align-items-center mb-5'>
                <p className='mt-0 mb-1'>Create an account to save team</p>
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

