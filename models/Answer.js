const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    question_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    answer:{
        type: String,
        required: true,
        ref: 'User'
    }
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports= Answer;