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
          atttributes: ['name', 'id'],
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
          atttributes: ['name', 'id'],
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
module.exports = router;
