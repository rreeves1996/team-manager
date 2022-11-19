const router = require('express').Router();
const { Team, Manager, Employee, Role } = require('../../models');

// Get All Teams
//* GET /api/teams
router.get('/', async (req, res) => {
	try {
		const teams = await Team.findAll();

		res.status(200).json(teams);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Get One Team
//* /api/teams/:id
router.get('/:id', async (req, res) => {
	try {
		const newTeam = await Team.findByPk(req.params.id, {
			include: [
				{
					model: Manager,
					atttributes: ['name', 'id', 'salary'],
				},
				{
					model: Employee,
					atttributes: ['name', 'id'],
				},
				{
					model: Role,
					attributes: ['id', 'title', 'salary'],
				},
			],
		});

		res.status(200).json(newTeam);
	} catch (err) {
		res.status(400).json(err);
	}
});

// Create New Team
//* /api/teams
router.post('/', async (req, res) => {
	try {
		const team = await Team.create({
			...req.body,
		});

		res.status(200).json(team);
	} catch (err) {
		res.status(400).json(err);
	}
});

// Update a Team
//* PUT /api/teams/:teamId
router.put('/:teamId', async (req, res) => {
	try {
		const team = await Team.update(req.body, {
			where: {
				id: req.params.teamId,
			},
		});

		if (!team) {
			res.status(404).json({ errMessage: 'No Team found with given ID' });
			return;
		}

		const updatedTeam = await Team.findByPk(req.params.teamId);

		res.status(200).json(updatedTeam);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Delete a Team
//* DELETE /api/teams/:teamId
router.delete('/:teamId', async (req, res) => {
	try {
		const deletedteam = await Team.findByPk(req.params.teamId);

		const teamToDelete = await Team.destroy({
			where: {
				id: req.params.teamId,
			},
		});

		if (!teamToDelete) {
			res.status(404).json({ errMessage: 'No Team found with given ID' });
			return;
		}

		res
			.status(200)
			.json({ message: 'Team succesfully deleted', Team: deletedteam });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
