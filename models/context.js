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
        users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    }
);

module.exports = mongoose.model('Context', ContextSchema) ;
