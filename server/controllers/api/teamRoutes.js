const router = require('express').Router();
const { Team } = require('../../models');


router.get('/:id', async (req, res) => {
    console.log(req);
    try {
        const newTeam = await Team.findAll({
            where: {
                id: req.params.id,
              },
              include: [
                  { 
                      model: Team,
                      atttributes: ['name', 'id'],
                  }
              ]
        });

        console.log(newTeam);
        res.status(200).json(newTeam);
    } catch (err) {
        res.status(400).json(err);
    }
})
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