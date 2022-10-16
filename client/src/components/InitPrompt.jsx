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

          await axios.put(`/api/managers/${res[1].data.id}`, { team_id: teamId })
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
                <p className='mt-1 mb-1'>Create an account to save team</p>
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

