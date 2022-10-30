import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import EmpCard from '../../cards/EmpCard';

export default function YourTeam(props) {
  const [loading, setLoading] = useState(true);

  console.log(props)
  return (
    <div className='your-team'>
      <h2>Your Team</h2>
      <div className='container-body'>
        <div className='managers mb-4'>
          <h5>
            <strong>Managers</strong>
          </h5>
          <div className='card-container'>
            {props.managers.map((manager) => {
              const managerNameSplit = manager.name.split(' ');
              const managerFirst = managerNameSplit[0].split('');
              const managerNameAbbreviated = `${managerFirst[0]}. ${managerNameSplit[1]}`;

              return (
                <>
                  <EmpCard
                    manager={true}
                    managers={props.managers}
                    key={props.id}
                    id={props.id}
                    abbreviatedname={managerNameAbbreviated}
                    name={manager.name}
                    role={manager.role}
                    lead={manager.lead}
                    number={manager.phone}
                    email={manager.email}
                    timeZone={manager.timeZone}
                  />
                </>
              );
            })}
          </div>
        </div>
        <div className="employees">
          <h5>
            <strong>Employees</strong>
          </h5>
          <div className='card-container'>
            {props.employees.map((employee) => {
              const employeeNameSplit = employee.name.split(' ');
              const employeeFirst = employeeNameSplit[0].split('');
              const employeeNameAbbreviated = `${employeeFirst[0]}. ${employeeNameSplit[1]}`;



              return (
                <>
                  <EmpCard
                    manager={false}
                    key={employee.id}
                    id={employee.id}
                    abbreviatedname={employeeNameAbbreviated}
                    name={employee.name}
                    role={employee.role_id}
                    number={employee.phone}
                    email={employee.email}
                    timeZone={employee.timeZone}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
