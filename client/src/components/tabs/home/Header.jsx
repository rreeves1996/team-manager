import React, { useState, useContext } from 'react';
import { FaUser } from 'react-icons/fa';
import { HiPencilSquare } from 'react-icons/hi2';
import { DataContext } from '../../Home';
import axios from 'axios';

export default function Header({ deleteTeam }) {
	const teamData = useContext(DataContext);
	const [collapsedMenu, toggleCollapseMenu] = useState(true);

	return (
		<header>
			<div className='row'>
				<div className='header-text'>
					<h1>{teamData.name}</h1>
					<h4>
						<FaUser className='manager-icon' /> Manager:{' '}
						<strong>{teamData.lead.name}</strong>
					</h4>
				</div>
				<div className={collapsedMenu ? 'menu-button' : 'menu-button open'}>
					<HiPencilSquare
						className='pencil-icon'
						onClick={() => toggleCollapseMenu(!collapsedMenu)}
					/>
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
	);
}
