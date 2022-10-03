const router = require('express').Router();
const { Role, Team } = require('../../models');

// Get All Roles
//* /api/roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.findAll();

    res.status(200).json(roles);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get a Specific Teams Roles
//* /api/roles/team/:teamId
router.get('/team/:teamId', async (req, res) => {
  try {
    const role = await Role.findAll({ teamId: req.params.teamId });

    res.status(200).json(role);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create New Role
//* /api/roles
router.post('/', async (req, res) => {
  console.log(req);
  try {
    const newRole = await Role.create({
      ...req.body,
    });

    res.status(200).json(newRole);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
