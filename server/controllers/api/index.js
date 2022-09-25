const router = require('express').Router();
const teamRoutes = require('./teamRoutes');
// const userRoutes = require('./userRoutes');

// const roleRoutes = require('./roleRoutes');
// const managerRoutes = require('./managerRoutes');
// const employeeRoutes = require('./employeeRoutes');

router.use('/teams', teamRoutes);
// router.use('/users', userRoutes);

// router.use('/roles', roleRoutes);
// router.use('/managers', managerRoutes);
// router.use('/employees', employeeRoutes);

module.exports = router;