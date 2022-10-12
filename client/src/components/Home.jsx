import React, { useState, useEffect } from 'react';
import HomeTab from './tabs/HomeTab';
import ManageTab from './tabs/ManageTab';

export default function InitPrompt({ handlePageChange }) {
  const [collapsedMenu, toggleCollapseMenu] = useState(true);
  const [currentTab, setCurrentTab] = useState('Home');




  // const teamName = localStorage.getItem('teamName');
  // const managerName = localStorage.getItem('managerName');


  const teamRoute = '/api/teams/1';
  const managerRoute = '/api/managers/1';

  const renderTab = () => {
    if (currentTab === 'Home') {
      return <HomeTab handleTabChange={handleTabChange} />;
    } else if (currentTab === 'Manage') {
      return <ManageTab handleTabChange={handleTabChange} />;
    }
  };
  const deleteTeam = () => {
    localStorage.clear();
    handlePageChange('Init');
  };

  const handleTabChange = (tab) => setCurrentTab(tab);


  const teamNameReq = fetch(teamRoute, {
      Method: 'GET'
    }).then((res) => {
      console.log(res);
      console.log({teamNameReq});
      return res.json();
  });

  const managerNameReq = fetch(managerRoute, {
      Method: 'GET'
    }).then((res) => {
      console.log(res);
      console.log(managerNameReq);
      return res.json();
  });

  console.log(managerNameReq.id, teamNameReq)

  // const { loading, data } = Promise.all([teamNameReq, managerNameReq]);
  // let teamName;
  // let managerName;
  
  // if (!loading) {
  //   console.log(data);
  // };
  return (
    <>
      <header>
        <div className='row'>
          <div className='header-text'>
            <h1></h1>
            <h4>
              <i className='fa-solid fa-user'></i> Manager:{' '}
              <strong>
                
              </strong>
            </h4>
          </div>
          <div className={collapsedMenu ? 'menu-button' : 'menu-button open'}>
            <i
              className='fa-solid fa-pen-to-square'
              onClick={() => toggleCollapseMenu(!collapsedMenu)}
            ></i>
            <ul className={!collapsedMenu ? 'team-menu' : 'team-menu collapse'}>
              <li id='edit-name'>Edit team name</li>
              <li id='edit-manager'>Edit manager</li>
              <li onClick={() => deleteTeam()} id='delete-team'>
                Delete team
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className='tab-container'>
        <button
          className='tab-button'
          onClick={() => {
            handleTabChange('Home');
          }}
        >
          Home
        </button>
        <button
          className='tab-button'
          onClick={() => {
            handleTabChange('Manage');
          }}
        >
          Manage
        </button>
      </div>
      <div className='home-container'>{renderTab()}</div>
    </>
  );
}
