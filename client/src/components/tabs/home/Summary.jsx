import React, { useState } from "react";
// import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
// dayjs.extend(customParseFormat);

export default function Summary(props) {
  const [collapsed, collapseStats] = useState(true);

  const employeeCount = 5;

  return (
    <div className='summary'>
      <h2>Summary</h2>
      <div className='summary-header'>
        <h6>Welcome to TeamEZ! Today is</h6>
        <h5>
          <strong>{dayjs().format('dddd, MMM D, YYYY')}</strong>
        </h5>
      </div>
      <div className='divider'></div>
      <div className='card-body'>
        <p>
          Your team currently has <strong>{props.managers.length}</strong>{' '}
          managers and <strong>{employeeCount}</strong> employees{' '}
          <span
            className='more-stats-toggler'
            onClick={() => collapseStats((prevState) => !prevState)}
          >
            More stats{' '}
            <i
              className={
                collapsed
                  ? 'fa-solid fa-caret-down'
                  : 'fa-solid fa-caret-down rotated'
              }
            ></i>
          </span>
        </p>
        <div className={collapsed ? 'more-stats collapsed' : 'more-stats'}>
          <p>
            <strong>Payroll Total: </strong>{' '}
          </p>
          <p>
            <strong>Avg. Salary:</strong>{' '}
          </p>
          {props.roles.map((role) => {
            console.log(role.roleName);
            return (
              <p>
                <strong>Total {role.roleName}s:</strong> {role.empCount}
              </p>
            );
          })}
        </div>
        <div className='info'>
          <i className='fa-solid fa-circle-exclamation'></i>
          <p>
            To edit your team name, manager, or delete your team, click the{' '}
            <i className='fa-solid fa-pen-to-square'></i> icon
          </p>
        </div>
        <div className='info'>
          <i className='fa-solid fa-circle-exclamation'></i>
          <p>
            To add/edit roles or salaries, select the <strong>Manage</strong>{' '}
            tab
          </p>
        </div>
      </div>
    </div>
  );
}