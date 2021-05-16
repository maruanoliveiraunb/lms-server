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
                id: mongoose.Schema.Types.ObjectId,
                role: String
            }
        ],
    }
);

module.exports = mongoose.model('Context', ContextSchema) ;
