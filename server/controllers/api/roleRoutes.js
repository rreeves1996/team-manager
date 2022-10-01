const router = require('express').Router();
const { Role, Team } = require('../../models');

// Get All Roles
//* /api/roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.findAll({
      // include: [
      //   {
      //     model: Team,
      //     attributes: ['name'],
      //   },
      // ],
    });

    res.status(200).json(roles);
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
