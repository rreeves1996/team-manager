import React, { useEffect, useState } from 'react';
import EmpCard from '../cards/EmpCard';

export default function HomeTab() {
  const [roles, addRole] = useState([]);
  const [managers, addManager] = useState([]);

  const employeeCount = 5;
  const managerCount = 2;
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
    lead: true,
    role: `Manager`,
    number:"(425) 422-3459",
    email:"queefin.qweet@seahawks.net",
    timeZone: 7
  }
  const manager2 = {
    teamName: `${localStorage.getItem("teamName")}`,
    name: `Kid Rock's Cousin`,
    lead: undefined,
    role: `Manager`,
    number:"(425) 993-2304",
    email:"walmart.krock@seahawks.net",
    timeZone: 7
  }

  const handleAddRoles = (newRole) => addRole(roles => [...roles, newRole]);
  const handleAddManagers = (newManager) => addManager(managers => [...managers, newManager]);

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

  
  
  const origDate = new Date().toDateString();
  const dateArray = origDate.split(" ");
  const dateNum = dateArray[2].split("");
  const date = {
    weekDay: "",
    day: "",
    month: "",
    year: dateArray[3]
  }

  switch(dateArray[0]) {
    case "Mon":
      date.weekDay = "Monday";
      break;
    case "Tue":
      date.weekDay = "Tuesday";
      break;
    case "Wed":
      date.weekDay = "Wednesday";
      break;
    case "Thu":
      date.weekDay = "Thursday";
      break;
    case "Fri":
      date.weekDay = "Friday";
      break;
    case "Sat":
      date.weekDay = "Saturday";
      break;
    case "Sun":
      date.weekDay = "Sunday";
      break;
    default:
      break;
  }
  switch(dateArray[1]) {
    case "Jan":
      date.month = "January";
      break;
    case "Feb":
      date.month = "February";
      break;
    case "Mar":
      date.month = "March";
      break;
    case "Apr":
      date.month = "April";
      break;
    case "May":
      date.month = "May";
      break;
    case "Jun":
      date.month = "June";
      break;
    case "Jul":
      date.month = "July";
      break;
    case "Aug":
      date.month = "August";
      break;
    case "Sep":
      date.month = "September";
      break;
    case "Oct":
      date.month = "October";
      break;
    case "Nov":
      date.month = "November";
      break;
    case "Dec":
      date.month = "December";
      break;
    default:
      break;
  }
  switch(dateNum[1]) {
    case "1":
      date.day = dateArray[2] + "st";
      break;
    case "2":
      date.day = dateArray[2] + "2nd";
      break;
    case "3":
      date.day = dateArray[2] + "rd";
      break;
    default:
      date.day = dateArray[2] + "th";
      break;

  }

  useEffect(() => {
    addAllRoles();
    addAllManagers();
  }, [])

  return (
    <>
      <div className="col-home">
        <div className="welcome">
          <h2>Summary</h2>
          <div className="welcome-header">
            <h6>Welcome to TeamEZ! Today is</h6>
            <h5><strong>{date.weekDay}, {date.month} {date.day}, {date.year}</strong></h5>
          </div>
          <div className="divider"></div>
          <div className="card-body">
            <p>Your team currently has <strong>{managerCount}</strong> managers 
            and <strong>{employeeCount}</strong> employees <span className='more-stats'>More stats <i className="fa-solid fa-caret-down"></i></span></p>
            <div className="section">
              <p><strong>Payroll Total: </strong> </p>
              <p><strong>Avg. Salary:</strong> </p>
              {roles.map(role => {
                console.log(role.roleName);
                return (
                  <p>
                    <strong>Total {role.roleName}s:</strong> {role.empCount}
                  </p>

                )})}
            </div>
            <p>To edit your team name, manager, or delete your team, click the <i className='fa-solid fa-pen-to-square'></i> icon</p>
          </div>
        </div>
        <div className="quick-add">
          <h2>Quick-Add</h2>
        </div>
      </div>
      <div className="your-team">
        <h2>Your Team</h2>
        <div className="card-body">
          <div className="managers">
            <h5><strong>Managers</strong></h5>
            <div className="card-container">
              {managers.map(manager => 
                <>
                  <EmpCard name={manager.name} role={manager.role} lead={manager.lead} number={manager.number} email={manager.email} timeZone={manager.timeZone}/>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

