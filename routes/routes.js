const router = require('express').Router();
const usersRoutes = require('./users');
const contextRoutes = require('./context');
const lineItemRoutes = require('./lineItems');

router.use(usersRoutes);
router.use(contextRoutes);
router.use(lineItemRoutes);

module.exports = router
