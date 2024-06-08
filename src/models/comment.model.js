const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    parentId: {
        type: Schema.Types.ObjectId,
        refPath: 'parentModel',  // Dynamic reference to either Answer or Comment model
        required: true
    },
    parentModel: {
        type: String,
        required: true,
        enum: ['Answer', 'Comment']  // Specify the models that can be referenced
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

commentSchema.index({parentId : 1});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
