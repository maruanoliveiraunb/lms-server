const mongoose = require("mongoose");

const LineItemSchema = new mongoose.Schema(
{
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        answers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer",
        }],
    }
);

module.exports = mongoose.model('LineItem', LineItemSchema) ;
