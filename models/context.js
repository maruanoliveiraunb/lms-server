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
        users: [mongoose.Schema.Types.ObjectId],
    }
);

module.exports = mongoose.model('Context', ContextSchema) ;
