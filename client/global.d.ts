interface ArrayConstructor {
	range(start: any, end: any): Array<any>;
}

type Manager = {
	name: string;
	id?: string;
	team_id?: string;
	is_lead?: boolean;
	salary?: number;
	phone?: string;
	email?: string;
	timezone?: string;
	role?: Role;
	role_title?: string;
	picture?: any;
};

type Employee = Manager & {
	role_id?: string;
	manager_id?: string;
};

type Role = {
	id?: string;
	title?: string;
	salary?: number;
	team_id?: string;
};

type Team = {
	name?: string;
	id?: string;
	lead_id?: string;
	manager_id?: string;
	managers?: Manager[];
	employees?: Employee[];
};

type CreateTeamPayload = Team & {
	user_id: string;
	employees: Array<Employee>;
	managers: Array<Manager>;
	roles: Array<Role>;
};

type UserData = {
	email: string;
	picture: string;
	username: string;
	name: string;
	teams: Array<any>;
};

type TeamData = {};
