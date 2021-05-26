const mongoose = require("mongoose");
const Role = require("../models/role.model");

module.exports = () => {
    mongoose
        .connect('mongodb+srv://lmsUser:jwSRdavsj5pZOkEG@cluster0.f1xdm.mongodb.net/lms?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() => {
            console.log("Successfully connect to MongoDB.");
            initial();
        })
        .catch(err => {
            console.error("Connection error", err);
            process.exit();
        });

    function initial() {
        Role.estimatedDocumentCount((err, count) => {
            if (!err && count === 0) {
                new Role({
                    name: "user"
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }

                    console.log("added 'user' to roles collection");
                });

                new Role({
                    name: "moderator"
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }

                    console.log("added 'moderator' to roles collection");
                });

                new Role({
                    name: "admin"
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }

                    console.log("added 'admin' to roles collection");
                });
            }
        });
    }
};

