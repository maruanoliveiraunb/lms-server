require('dotenv').config();
const express = require("./configs/express");
const database = require("./configs/database");
// const cors = require('cors');
// const db = require("./config/database");

class App {
    constructor() {
        this.express = express;
        this.database = database;

        
        // this.middlewares();
        this.express();
        this.database();

        // this.express.listen((process.env.PORT || 3000), () =>
        //     console.log(`Sua API REST está funcionando na porta 3000`)
        // );
    }

    // database() {
    //     mongoose.connect(db.uri, { useNewUrlParser: true });
    // }

    // middlewares() {
    //     this.express.use(express.json());
    //     this.express.use(cors());
    // }

    // routes() {
    //     this.express.use(require("./routes"));
    // }
}

module.exports = new App().express;
