const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Types.ObjectId
    },
    question: {
        type: String,
        required: true,
        ref: 'User'
    },
    answerType: {
        type: String,
        required: true
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;