const router = require('express').Router();
const { User, Team, Role, Employee, Manager} = require('../models');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Team.findAll({
            include: [
              {
                model: Team,
                attributes: ['name'],
              },
              {
                model: Employee,
                attributes: ['id','name']
              }
            ],
          });

        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/login', (req, res) => {
//     try {
//         res.render('login', {
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);  
//     }
// });

// router.get('/register', (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect('/dashboard');
//         return;
//     }
    
//     res.render('register', {});
// });

module.exports = router;