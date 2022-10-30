import React, { useState } from 'react';
import axios from "axios";

export default function InitPrompt({ handlePageChange }) {
  const [formState, setFormState] = useState({ teamname: '', leadname: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let teamName = formState.teamname.trim();
    let managerName = formState.leadname.trim();

    if (teamName && managerName) {
      const reqOne = axios.post("/api/teams/", { name: teamName });
      const reqTwo = axios.post("/api/managers/", { name: managerName });

      await axios.all([reqOne, reqTwo])
        .then(async (res) => {
          const teamId = res[0].data.id;
          localStorage.setItem("teamID", teamId);

          await axios.put(`/api/managers/${res[1].data.id}`, { team_id: teamId })
            .then((res) => {
              console.log(`Manager's team ID(${teamId}) updated`);

              handlePageChange('Home');
            })
            .catch((err) => console.log(`Failed to update manager's team ID: ${err}`));
        })
        .catch((err) => console.log(`Failed to create team/manager: ${err}`));
    } else if (!teamName || !managerName) {
      teamName = 'The Seattle Puddlechickens';
      managerName = 'Qweet Farrol';

      const reqOne = axios.post("/api/teams/", { name: teamName });
      const reqTwo = axios.post("/api/managers/", { name: managerName });

      await axios.all([reqOne, reqTwo])
        .then(async (res) => {
          const teamId = res[0].data.id;
          localStorage.setItem("teamID", teamId);

          await axios.put(`/api/managers/${res[1].data.id}`, { team_id: teamId, is_lead: true })
            .then((res) => {
              console.log(`Manager's team ID(${teamId}) updated`);

              handlePageChange('Home');
            })
            .catch((err) => console.log(`Failed to update manager's team ID: ${err}`));
        })
        .catch((err) => console.log(`Failed to create team/manager: ${err}`));
    }

    setFormState({
      teamname: '',
      leadname: '',
    });
  };
  

  return (
    <>
      <div className='container login-container'>
        <div className='form-side'>
          <h1>Sign In</h1>
          <h6>Enter your account information</h6>
          <form className='form-container' onSubmit={handleFormSubmit}>
            <div className='login-input'>
              <div className='field'>
                <label className='label'>Email:</label>
                <div className='control'>
                  <input
                    className='input'
                    type='email'
                    name='email'
                    placeholder="Your email"
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
                    placeholder="Your password"
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
                <p className='mt-1 mb-1'>Want to create an account?</p>
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

