const router = require('express').Router();
const { User, Team } = require('../../models');
const { signToken } = require('../../utils/auth');

//? https://webdeasy.de/en/complete-login-system-with-node-js-vue-js-restapi-jwt-part-1-2/

//* /api/users endpoint

// Create a User
//* /api/users/create
router.post('/create', async (req, res) => {
	try {
		const newUser = await User.create(req.body);
		const user = {
			id: newUser.id,
			email: newUser.email,
			password: newUser.password,
		};
		const token = signToken(user);

		req.session.save(() => {
			req.session.user_id = newUser.id;
			req.session.logged_in = true;
			req.session.token = token;

			res.status(200).json({
				user: newUser,
				token: req.session.token,
				message: 'You are now logged in!',
			});
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

// Login a User
//* /api/users/login
router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({ where: { email: req.body.email } });
		const user = {
			id: userData.id,
			email: userData.email,
			password: userData.password,
		};
		const validPassword = userData.checkPassword(req.body.password);
		const token = signToken(user);

		if (!userData) {
			res
				.status(400)
				.json({ message: 'Incorrect email or password, please try again' });
			return;
		}

		if (!validPassword) {
			res
				.status(400)
				.json({ message: 'Incorrect email or password, please try again' });
			return;
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;
			req.session.token = token;

			console.log(req.session);

			res.status(200).json({
				user: userData,
				token: req.session.token,
				message: 'You are now logged in!',
			});
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Logout a User
//* /api/users/logout
router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

// Get all Users
//* /api/users
router.get('/', async (req, res) => {
	try {
		const users = await User.findAll();

		res.status(200).json(users);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Get One User
//* /api/users/:id
router.get('/:id', async (req, res) => {
	try {
		const newUser = await User.findByPk(req.params.id, {
			include: [
				{
					model: Team,
					attributes: ['id', 'name', 'user_id'],
				},
			],
		});

		res.status(200).json(newUser);
	} catch (err) {
		res.status(400).json(err);
	}
});
module.exports = router;
