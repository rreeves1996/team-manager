import React, { useEffect, useState } from 'react';
import Summary from './home/Summary';
import QuickAdd from './home/QuickAdd';
import YourTeam from './home/YourTeam';

export default function HomeTab() {
  const [roles, addRole] = useState([]);
  const [managers, addManager] = useState([]);
  const [employees, addEmployee] = useState([]);


  useEffect(() => {

  }, []);

  const handleAddRoles = (newRole) => 
    addRole((roles) => [...roles, newRole]);
  const handleAddManagers = (newManager) =>
    addManager((managers) => [...managers, newManager]);
  const handleAddEmployees = (newEmployee) =>
    addEmployee((employees) => [...employees, newEmployee]);

  return (
    <>
      <div className='col-home'>
        <Summary managers={managers} roles={roles} />
        <QuickAdd handleAddEmployees={handleAddEmployees} />
      </div>
      <YourTeam managers={managers} />
    </>
  );
}

