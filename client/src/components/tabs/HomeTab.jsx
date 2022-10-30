import React, { useEffect, useState, useContext } from 'react';
import Summary from './home/Summary';
import QuickAdd from './home/QuickAdd';
import YourTeam from './home/YourTeam';
import { DataContext } from '../Home';

export default function HomeTab() {
  const [teamRoles, addRole] = useState([]);
  const [teamManagers, addManager] = useState([]);
  const [teamEmployees, addEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const teamData = useContext(DataContext);
  

  useEffect(() => {
    const updateParams = () => {
      const managers = teamData.manager;
      const employees = teamData.employees;
      const roles = teamData.roles;
      
      addManager((teamManagers) => [...teamManagers, managers]);
      addEmployee((teamEmployees) => [...teamEmployees, employees]);
      addRole((teamRoles) => [...teamRoles, roles]);
      setLoading(!loading);
    }

    updateParams();
  }, []);

  const handleAddRoles = (newRole) => 
    addRole((roles) => [...roles, newRole]);
  const handleAddManagers = (newManager) =>
    addManager((teamManagers) => [...teamManagers, newManager]);
  const handleAddEmployees = (newEmployee) =>
    addEmployee((employees) => [...employees, newEmployee]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
        <div className='col-home'>
          <Summary managers={teamManagers} roles={teamRoles} employees={teamEmployees[0]} />
          <QuickAdd handleAddEmployees={handleAddEmployees} />
        </div>
        <YourTeam managers={teamManagers} roles={teamRoles} employees={teamEmployees[0]} />
        </>
      )}

    </>
  );
}

