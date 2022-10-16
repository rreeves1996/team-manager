import React, { useEffect, useState } from 'react';
import Summary from './home/Summary';
import QuickAdd from './home/QuickAdd';
import YourTeam from './home/YourTeam';
import { useContext } from 'react';
import { DataContext } from '../Home';

export default function HomeTab() {
  const [roles, addRole] = useState([]);
  const [teamManagers, addManager] = useState([]);
  const [employees, addEmployee] = useState([]);
  const teamData = useContext(DataContext);
  

  useEffect(() => {
    const managers = teamData.manager;

    addManager((teamManagers) => [...teamManagers, managers]);
  }, []);

  const handleAddRoles = (newRole) => 
    addRole((roles) => [...roles, newRole]);
  const handleAddManagers = (newManager) =>
    addManager((teamManagers) => [...teamManagers, newManager]);
  const handleAddEmployees = (newEmployee) =>
    addEmployee((employees) => [...employees, newEmployee]);

  return (
    <>
      <div className='col-home'>
        <Summary managers={teamManagers} roles={roles} />
        <QuickAdd handleAddEmployees={handleAddEmployees} />
      </div>
      <YourTeam managers={teamManagers} />
    </>
  );
}

