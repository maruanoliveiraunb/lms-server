const { verifySignUp } = require("../middlewares");
const AuthService = require("../services/auth.service");
const router = require('express').Router();

router.post(
    "/auth/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    AuthService.signup
);

router.post("/auth/signin", AuthService.signin);

module.exports = router;
