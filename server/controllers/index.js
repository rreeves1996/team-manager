const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

router.get('/api-test', async (req, res) => {
	try {
		res.send('API is working!');
	} catch (err) {
		res.status(500).json(err);
	}
});

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
