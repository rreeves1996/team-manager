const router = require('express').Router();

const userRoutes = require('./userRoutes');
router.use('/users', userRoutes);

const teamRoutes = require('./teamRoutes');
router.use('/teams', teamRoutes);

const managerRoutes = require('./managerRoutes');
router.use('/managers', managerRoutes);

const employeeRoutes = require('./employeeRoutes');
router.use('/employees', employeeRoutes);

const roleRoutes = require('./roleRoutes');
router.use('/roles', roleRoutes);

module.exports = router;