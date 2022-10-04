const router = require('express').Router();
const { Manager, Employee } = require('../../models');

// Get All Managers
//* /api/managers
router.get('/', async (req, res) => {
  try {
    const manager = await Manager.findAll({
      include: [
        {
          model: Employee,
          atttributes: ['name', 'id'],
        },
      ],
    });

    res.status(200).json(manager);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get One Manager
//* /api/managers/:id
router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const manager = await Manager.findByPk(req.params.id, {
      include: [
        {
          model: Employee,
          atttributes: ['name', 'id'],
        },
      ],
    });

    res.status(200).json(manager);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create New Manager
//* /api/managers/
router.post('/', async (req, res) => {
  try {
    const manager = await Manager.create({
      ...req.body,
    });

    res.status(200).json(manager);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
