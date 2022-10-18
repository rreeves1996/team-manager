import React, { useState, useEffect } from 'react';
import axios from "axios";
import HomeTab from './tabs/HomeTab';
import ManageTab from './tabs/ManageTab';
import { createContext } from 'react';

export const DataContext = createContext();

export default function InitPrompt({ handlePageChange }) {
  const [collapsedMenu, toggleCollapseMenu] = useState(true);
  const [currentTab, setCurrentTab] = useState('Home');
  const [teamData, setTeamData] = useState({});
  const [loading, setLoading] = useState(true);

  const renderTab = () => {
    if (currentTab === 'Home') {
      return <HomeTab />;
    } else if (currentTab === 'Manage') {
      return <ManageTab />;
    }
  };
  const deleteTeam = () => {
    localStorage.clear();
    handlePageChange('Init');
  };

  const handleTabChange = (tab) => setCurrentTab(tab);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/api/teams/")
        .then(async (res) => {
          const prevTeam = localStorage.getItem("teamID");
          if(prevTeam) {
            await axios.get(`/api/teams/${prevTeam}`)
              .then((res) => {
                setTeamData(res.data);
                console.log(res);
              })
              .catch((err) => console.error(`Failed to get team with specified ID: ${err}`));
          } else {
            await axios.get(`/api/teams/${res.data.length}`)
              .then((res) => {
                setTeamData(res.data);
                console.log(res);
              })
              .catch((err) => console.error(`Failed to get team with specified ID: ${err}`));
          }
        })
        .catch((err) => console.error(`Failed to get teams: ${err}`));
      setLoading(!loading);
    };
    
    fetchData().catch(console.error);
  }, [])

  return (
    <>
      {loading ? (
        <>
          <h1>Loading...</h1>
        </> 
      ) : (
        <>
          <header>
            <div className='row'>
              <div className='header-text'>
                <h1>
                  {teamData && teamData.name}
                </h1>
                <h4>
                  <i className='fa-solid fa-user'></i> Manager:{' '}
                  <strong>
                    {teamData && teamData.manager.name}
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
          <DataContext.Provider value={teamData}>
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
          </DataContext.Provider>
        </>
      )}
    </>
  );
}
