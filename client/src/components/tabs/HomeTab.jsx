import React, { useEffect, useState } from 'react';
import Summary from './home/Summary';
import QuickAdd from './home/QuickAdd';
import YourTeam from './home/YourTeam';

export default function HomeTab() {
  const [roles, addRole] = useState([]);
  const [managers, addManager] = useState([]);
  const [employees, addEmployee] = useState([]);



  const role1 = {
    roleName: "Quarterback",
    roleSalary: 5,
    empCount: 2
  }
  const role2 = {
    roleName: "Runningback",
    roleSalary: 8000,
    empCount: 2
  }
  const role3 = {
    roleName: "Crowd Streaker",
    roleSalary: 500000,
    empCount: 1
  }
  const manager1 = {
    teamName: `${localStorage.getItem("teamName")}`,
    name: `${localStorage.getItem("managerName")}`,
    id: 1,
    lead: true,
    role: `Manager`,
    number:"(425) 422-3459",
    email:"queefin.qweet@seahawks.net",
    timeZone: 7,
    salary: 100000
  }
  const manager2 = {
    teamName: `${localStorage.getItem("teamName")}`,
    name: `Kid Croc`,
    id: 2,
    lead: undefined,
    role: `Manager`,
    number:"(425) 993-2304",
    email:"walmart.krock@seahawks.net",
    timeZone: 7,
    salary: 90000
  }

  const addAllRoles = () => {
    handleAddRoles(role1);
    handleAddRoles(role2);
    handleAddRoles(role3);
    console.log(roles);
  }
  
  const addAllManagers = () => {
    handleAddManagers(manager1);
    handleAddManagers(manager2);
    console.log(managers);
  }



  useEffect(() => {
    addAllRoles();
    addAllManagers();
  }, [])

  const handleAddRoles = (newRole) => addRole(roles => [...roles, newRole]);
  const handleAddManagers = (newManager) => addManager(managers => [...managers, newManager]);
  const handleAddEmployees = (newEmployee) => addEmployee(employees => [...employees, newEmployee]);

  return (
    <>
      <div className="col-home">
        <Summary managers={managers} roles={roles} />
        <QuickAdd handleAddEmployees={handleAddEmployees} />
      </div>
      <YourTeam managers={managers} />           
    </>
  );
}

