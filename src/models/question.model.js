const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    topics: [{
        type: Schema.Types.ObjectId,
        ref: 'Topic'  // Reference to the Topic model
    }],
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

questionSchema.index({userId : 1});
questionSchema.index({topics : 1});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
