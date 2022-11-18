const router = require('express').Router();
const { Employee, Role, Team, Manager } = require('../../models');

// Get All Employees
//* /api/employees
router.get('/', async (req, res) => {
	try {
		const employee = await Employee.findAll({
			include: [
				{
					model: Role,
					atttributes: ['title', 'id'],
				},
			],
		});

		res.status(200).json(employee);
	} catch (err) {
		res.status(400).json(err);
	}
});

// Get One Employee
//* /api/employees/:id
router.get('/:id', async (req, res) => {
	try {
		const employee = await Employee.findByPk(req.params.id, {
			include: [
				{
					model: Manager,
					atttributes: ['name', 'id', 'salary'],
				},
				{
					model: Role,
					atttributes: ['title', 'id'],
				},
				{
					model: Team,
					attributes: ['name', 'id'],
				},
			],
		});

		res.status(200).json(employee);
	} catch (err) {
		res.status(400).json(err);
	}
});

// Create New Employee
//* /api/employees
router.post('/', async (req, res) => {
	try {
		const employee = await Employee.create({
			...req.body,
		});

		res.status(200).json(employee);
	} catch (err) {
		res.status(400).json(err);
	}
});

// Update an Employee
//* PUT /api/employees/:empId
router.put('/:empId', async (req, res) => {
	try {
		const emp = await Employee.update(req.body, {
			where: {
				id: req.params.empId,
			},
		});

		if (!emp) {
			res.status(404).json({ errMessage: 'No employee found with given ID' });
			return;
		}

		const updatedEmp = await Employee.findByPk(req.params.empId);

		res.status(200).json(updatedEmp);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Delete an Employee
//* DELETE /api/employees/:empId
router.delete('/:empId', async (req, res) => {
	try {
		const deletedEmp = await Employee.findByPk(req.params.empId);

		const empToDelete = await Employee.destroy({
			where: {
				id: req.params.empId,
			},
		});

		if (!empToDelete) {
			res.status(404).json({ errMessage: 'No employee found with given ID' });
			return;
		}

		res
			.status(200)
			.json({ message: 'Employee succesfully deleted', Employee: deletedEmp });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
