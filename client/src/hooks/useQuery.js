import React from 'react';
import axios from 'axios';

const API_ROUTE = '/api';

export default function useQuery() {
	async function queryUser(id) {
		try {
			const res = await axios.get(`${API_ROUTE}/users/${id}`);

			return res;
		} catch (err) {
			console.log(`Registration failed! Error:\n${err}`);
		}
	}

	async function queryTeamsByUser(id) {
		try {
			const res = await axios.get(`${API_ROUTE}/teams/user/${id}`);

			return res;
		} catch (err) {
			console.log(`Registration failed! Error:\n${err}`);
		}
	}

	async function addEmployee(payload) {
		const { name, role_id, manager_id, team_id } = payload;

		try {
			const res = await axios.post(`${API_ROUTE}/employees`, {
				name,
				role_id,
				manager_id,
				team_id,
			});

			return res;
		} catch (err) {
			console.log(`Registration failed! Error:\n${err}`);
		}
	}

	async function addManager(payload) {
		const { name, is_lead, team_id } = payload;

		try {
			const res = await axios.post(`${API_ROUTE}/managers`, {
				name,
				is_lead,
				team_id,
			});

			return res;
		} catch (err) {
			console.log(`Registration failed! Error:\n${err}`);
		}
	}

	async function editTeamName(payload) {
		const { name, id } = payload;

		try {
			const res = await axios.put(`${API_ROUTE}/teams/${id}`, {
				name,
			});

			return res;
		} catch (err) {
			console.log(`Registration failed! Error:\n${err}`);
		}
	}

	async function editTeamLead(payload) {
		const { lead_id, manager_id } = payload;

		try {
			const reqOne = axios.put(`${API_ROUTE}/managers/${lead_id}`, {
				is_lead: false,
			});
			const reqTwo = axios.put(`${API_ROUTE}/managers/${manager_id}`, {
				is_lead: true,
			});
			const res = await axios.all([reqOne, reqTwo]);

			return res;
		} catch (err) {
			console.log(`Registration failed! Error:\n${err}`);
		}
	}

	async function deleteTeam(id) {
		try {
			const res = await axios.delete(`${API_ROUTE}/teams/${id}`);

			return res;
		} catch (err) {
			console.log(`Registration failed! Error:\n${err}`);
		}
	}

	return {
		queryUser,
		queryTeamsByUser,
		addEmployee,
		addManager,
		editTeamName,
		editTeamLead,
		deleteTeam,
	};
}
