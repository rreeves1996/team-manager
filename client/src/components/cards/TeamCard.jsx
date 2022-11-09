import React from 'react';
import '../../assets/style/teamcard.css';

export default function TeamCard(props) {
	console.log(props.team);
	return (
		<>
			<div className='team-card-container'>
				<div className='team-card-header'>
					<h3>
						<strong></strong>
					</h3>
					<p>managed by</p>
				</div>
			</div>
		</>
	);
}
