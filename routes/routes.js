const router = require('express').Router();
// const usersRoutes = require('./users');
const contextRoutes = require('./context');
const lineItemRoutes = require('./lineItems');
const answerRoutes = require('./answer');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

// router.use(usersRoutes);
router.use(contextRoutes);
router.use(lineItemRoutes);
router.use(answerRoutes);
router.use(authRoutes);
router.use(userRoutes);

module.exports = router
