const mongoose = require("mongoose");

const ContextSchema = new mongoose.Schema(
{
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        users: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                role: String
            }
        ],
    }
);

module.exports = mongoose.model('Context', ContextSchema) ;
