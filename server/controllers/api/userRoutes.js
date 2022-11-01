const router = require('express').Router();
const { User } = require('../../models');

//? https://webdeasy.de/en/complete-login-system-with-node-js-vue-js-restapi-jwt-part-1-2/

//* /api/users endpoint

// Create a User
//* /api/users/create
router.post('/create', async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login a User
//* /api/users/login
router.put('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });

      if (!userData) {
        res.status(400).json({ message: 'Incorrect email or password, please try again' });
        return;
      }

      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect email or password, please try again' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.status(200).json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Logout a User
//* /api/users/logout
router.put('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});


router.get('/', async (req, res) => {
    try {
       const users = await User.findAll()

       res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
