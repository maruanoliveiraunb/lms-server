const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../routes/routes');
const { authJwt, authHeaders } = require("../middlewares");

module.exports = () => {
    const app = express()
    const port = process.env.SERVER_PORT

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    app.use(authHeaders.accessTokenHeaders);
    app.use(authJwt.unless(['/auth/signin', '/auth/signup'], authJwt.verifyToken));

    app.use(routes)
    
    app.listen(port, () => {
      console.log(`LMS Server app listening at http://localhost:${port}`)
    })

    return app;
}
