const router = require('express').Router();
const usersRoutes = require('./users');
const contextRoutes = require('./context');
const lineItemRoutes = require('./lineItems');
const answerRoutes = require('./answer');

router.use(usersRoutes);
router.use(contextRoutes);
router.use(lineItemRoutes);
router.use(answerRoutes);

module.exports = router
