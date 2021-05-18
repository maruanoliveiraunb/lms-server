const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
{
        file: {
            type: String,
            required: true,
        },
        feedback: {
            type: String,
        },
        grade: {
            type: Number,
        },
        learner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    }
);

module.exports = mongoose.model('Answer', AnswerSchema) ;
