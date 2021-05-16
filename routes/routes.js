const router = require('express').Router();
const usersRoutes = require('./users');
const contextRoutes = require('./context');

router.use(usersRoutes);
router.use(contextRoutes);

module.exports = router