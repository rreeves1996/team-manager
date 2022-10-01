const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.get('/api-test', async (req, res) => {
  try {
    res.send('API is working!');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.use('/api', apiRoutes);
router.use('/', homeRoutes);


module.exports = router;