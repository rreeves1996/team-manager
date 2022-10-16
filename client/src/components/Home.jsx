import React, { useState, useEffect } from 'react';
import axios from "axios";
import HomeTab from './tabs/HomeTab';
import ManageTab from './tabs/ManageTab';

export default function InitPrompt({ handlePageChange }) {
  const [collapsedMenu, toggleCollapseMenu] = useState(true);
  const [currentTab, setCurrentTab] = useState('Home');
  const [teamData, setTeamData] = useState({});
  const [managerData, setManagerData] = useState({});

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

  
  useEffect(() => {
    const fetchData = async () => {
      const reqOne = axios.get("/api/teams/5");
      const reqTwo = axios.get("/api/managers/10");

      await axios.all([reqOne, reqTwo]).then((res) => {
        setTeamData(res[0].data);
        setManagerData(res[1].data);
        console.log(res)
        console.log(teamData.name);
        console.log(managerData.name);
      })
    }

    fetchData().catch(console.error);
  }, [])

  return (
    <>
      
      <header>
        <div className='row'>
          <div className='header-text'>
            <h1>{teamData.name}</h1>
            <h4>
              <i className='fa-solid fa-user'></i> Manager:{' '}
              <strong>
                {managerData.name}
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
