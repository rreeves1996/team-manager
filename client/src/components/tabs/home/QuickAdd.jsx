import React, { useState, useContext } from "react";
import axios from 'axios';
import { DataContext } from '../../Home';

export default function QuickAdd(props) {
  const [formState, setFormState] = useState({ empname: '', emprole: '' });
  const teamData = useContext(DataContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async () => {

    let newEmpName = formState.empname.trim();
    let newEmpRole = formState.emprole.trim();

    if (newEmpName && newEmpRole) {
      await axios.post('/api/employees/', { 
        name: newEmpName, 
        role_id: newEmpRole,
        manager_id: teamData.manager.id,
        team_id: teamData.id 
      }).then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    setFormState({
      teamname: '',
      leadname: '',
    });
  };

  return (
    <div className='quick-add'>
      <h2>Quick-Add</h2>
      <div className="container-body">
        <form className='form-container' onSubmit={handleFormSubmit}>
          <div className='employee-input'>
            <div className='field name-field'>
              <label className='label'>Name:</label>
              <div className='control'>
                <input
                  className='input'
                  type='empname'
                  name='empname'
                  placeholder="New employee name"
                  value={formState.empname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='field role-field'>
              <label className='label'>Role:</label>
              <select                  
                className='role-select'
                type='emprole'
                name='emprole'
                value={formState.emprole}
                onChange={handleChange}>
                <option value="" disabled selected>Select role...</option>
                {props.roles.map((role) => (
                  <option value={role.id}>{role.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='button-container'>
            <button className='form-button' type='submit'>
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 