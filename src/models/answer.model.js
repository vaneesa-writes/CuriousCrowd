const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question',  // Reference to the Question model
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now  // Set default value to current timestamp
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    }
});

answerSchema.index({questionId : 1});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
