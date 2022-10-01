const router = require('express').Router();
const { Team, Manager, Employee, Role } = require('../../models');

//* /api/teams endpoint

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
          attributes: ['id', 'name', 'salary'],
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
    console.log(req);
    try {
        const newTeam = await Team.create({
            ...req.body
        });

        console.log(newTeam);
        res.status(200).json(newTeam);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;