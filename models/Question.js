const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    category: [{
        type: String
    }],
    question: {
        type: String,
        required: true,
    },
    answerType: {
        type: String,
        required: true
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;