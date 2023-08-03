import React from 'react';
import axios from 'axios';

const API_ROUTE = '/api';

export default function useQuery() {
	async function queryUser(id: number) {
		try {
			const res = await axios.get(`${API_ROUTE}/users/${id}`);

			return res;
		} catch (err) {
			console.log(`User query failed! Error:\n${err}`);
		}
	}

	async function queryTeam(id: number) {
		try {
			const res = await axios.get(`${API_ROUTE}/teams/${id}`);

			return res;
		} catch (err) {
			console.log(`User query failed! Error:\n${err}`);
		}
	}

	async function queryManager(id: number) {
		try {
			const res = await axios.get(`${API_ROUTE}/managers/${id}`);

			return res;
		} catch (err) {
			console.log(`User query failed! Error:\n${err}`);
		}
	}

	async function queryTeamsByUser(id: number) {
		try {
			const res = await axios.get(`${API_ROUTE}/teams/user/${id}`);

			return res;
		} catch (err) {
			console.log(`Team query failed! Error:\n${err}`);
		}
	}

	async function addEmployee(payload: Employee) {
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
			console.log(`Failed to add employee! Error:\n${err}`);
		}
	}

	async function addManager(payload: Manager) {
		const { name, is_lead, team_id } = payload;

		try {
			const res = await axios.post(`${API_ROUTE}/managers`, {
				name,
				is_lead,
				team_id,
			});

			return res;
		} catch (err) {
			console.log(`Failed to add manager! Error:\n${err}`);
		}
	}

	async function addRole(payload: Role) {
		const { title, salary, team_id } = payload;

		try {
			const res = await axios.post(`${API_ROUTE}/roles`, {
				title,
				salary,
				team_id,
			});

			return res;
		} catch (err) {
			console.log(`Failed to add role! Error:\n${err}`);
		}
	}

	async function editTeamName(payload: Team) {
		const { name, id } = payload;

		try {
			const res = await axios.put(`${API_ROUTE}/teams/${id}`, {
				name,
			});

			return res;
		} catch (err) {
			console.log(`Failed to edit team name! Error:\n${err}`);
		}
	}

	async function editTeamLead(payload: Team) {
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
			console.log(`Failed to edit team lead! Error:\n${err}`);
		}
	}

	async function deleteEmployee(id: string | undefined) {
		try {
			const res = await axios.delete(`${API_ROUTE}/employees/${id}`);

			return res;
		} catch (err) {
			console.log(`Failed to delete team! Error:\n${err}`);
		}
	}

	async function deleteManager(id: string | undefined) {
		try {
			const res = await axios.delete(`${API_ROUTE}/managers/${id}`);
			localStorage.deleteItem('teamId');

			return res;
		} catch (err) {
			console.log(`Failed to delete team! Error:\n${err}`);
		}
	}

	async function deleteTeam(id: string) {
		try {
			const res = await axios.delete(`${API_ROUTE}/teams/${id}`);

			return res;
		} catch (err) {
			console.log(`Failed to delete team! Error:\n${err}`);
		}
	}

	async function createTeam(payload: CreateTeamPayload) {
		const { name, user_id, employees, managers, roles } = payload;
		let team_id: string;
		let teamLead: Manager;

		try {
			await axios
				.post(`${API_ROUTE}/teams/`, {
					name,
					user_id,
				})
				.then((res) => {
					team_id = res.data.id;

					localStorage.setItem('teamID', team_id);

					managers.forEach((manager) => {
						const managerPayload = {
							name: manager.name,
							is_lead: manager.is_lead,
							team_id,
						};

						addManager(managerPayload).then((res) => {
							if (res!.data.is_lead) {
								teamLead = res!.data;
							}
						});
					});
				})
				.finally(() =>
					roles.forEach((role) => {
						const rolePayload = {
							title: role.title,
							salary: role.salary,
							team_id,
						};
						const employeesInRole = employees.filter(
							(employee) => employee.role!.title === role.title
						);

						addRole(rolePayload).then((res) => {
							console.log(res);
							const role_id = res!.data.id;

							employeesInRole.forEach((employee) => {
								const employeePayload = {
									name: employee.name,
									role_id,
									manager_id: teamLead.id,
									team_id,
								};

								addEmployee(employeePayload);
							});
						});
					})
				);
		} catch (err) {
			console.log(`Team creation failed! Error:\n${err}`);
		}
	}

	return {
		queryUser,
		queryTeam,
		queryManager,
		queryTeamsByUser,
		addEmployee,
		addManager,
		addRole,
		editTeamName,
		editTeamLead,
		deleteEmployee,
		deleteManager,
		deleteTeam,
		createTeam,
	};
}
