const { authJwt } = require("../middlewares");
const UserService = require("../services/user.service");
const router = require('express').Router();

router.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

router.get("/test/all", UserService.allAccess);

router.get("/test/user", [authJwt.verifyToken], UserService.userBoard);

router.get(
        "/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        UserService.moderatorBoard
    );

router.get(
        "/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        UserService.adminBoard
    );

module.exports = router;
