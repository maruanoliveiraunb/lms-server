const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/routes');

module.exports = () => {
    const app = express()
    const port = process.env.SERVER_PORT

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(routes)
    
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })

    return app;
}
