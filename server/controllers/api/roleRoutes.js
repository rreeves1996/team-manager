const router = require('express').Router();
const { Role, Team } = require('../../models');

// Get All Roles
//* GET /api/roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.findAll();

    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a Specific Teams Roles
//* GET /api/roles/team/:teamId
router.get('/team/:teamId', async (req, res) => {
  try {
    const role = await Role.findAll({ teamId: req.params.teamId });

    res.status(200).json(role);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create New Role
//* POST /api/roles
router.post('/', async (req, res) => {
  try {
    const newRole = await Role.create({
      ...req.body,
    });

    res.status(200).json(newRole);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a Role
//* PUT /api/roles/:roleId
router.put('/:roleId', async (req, res) => {
  try {
    const role = await Role.update(req.body, {
      where: {
        id: req.params.roleId
      }
    })

    if (!role) {
      res.status(404).json({ errMessage: 'No role found with given ID'});
      return;
    }
    
    const updatedRole = await Role.findByPk(req.params.roleId)

    res.status(200).json(updatedRole)
  } catch (err) {
    res.status(500).json(err)
  }
});

// Delete a Role
//* DELETE /api/roles/:roleId
router.delete('/:roleId', async (req, res) => {
  try {
    const deletedRole = await Role.findByPk(req.params.roleId);

    const roleToDelete = await Role.destroy({
      where: {
        id: req.params.roleId
      }
    });

    if (!roleToDelete) {
      res.status(404).json({ errMessage: 'No role found with given ID'});
      return;
    };
    
    res.status(200).json({message: 'Role succesfully deleted', Role: deletedRole});
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
