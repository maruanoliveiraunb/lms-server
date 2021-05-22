const mongoose = require("mongoose");
SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
{
        name: String,
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    }
);

module.exports = mongoose.model('User', UserSchema) ;
