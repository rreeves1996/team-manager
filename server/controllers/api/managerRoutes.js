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

// Update a Manager
//* PUT /api/managers/:manId
router.put('/:manId', async (req, res) => {
  try {
    const man = await Manager.update(req.body, {
      where: {
        id: req.params.manId
      }
    });

    if (!man) {
      res.status(404).json({ errMessage: 'No Manager found with given ID'});
      return;
    };
    
    const updatedman = await Manager.findByPk(req.params.manId);

    res.status(200).json(updatedman);
  } catch (err) {
    res.status(500).json(err)
  };
});

// Delete a Manager
//* DELETE /api/managers/:manId
router.delete('/:manId', async (req, res) => {
  try {
    const deletedman = await Manager.findByPk(req.params.manId);

    const manToDelete = await Manager.destroy({
      where: {
        id: req.params.manId
      }
    });

    if (!manToDelete) {
      res.status(404).json({ errMessage: 'No Manager found with given ID'});
      return;
    };
    
    res.status(200).json({message: 'Manager succesfully deleted', Manager: deletedman});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
