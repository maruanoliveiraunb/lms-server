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
    }
);

module.exports = mongoose.model('LineItem', LineItemSchema) ;
