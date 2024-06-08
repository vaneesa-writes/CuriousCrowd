const {Answer,Question, User, Comment} = require("../models");
const NotFoundError = require("../error/notFoundError");

class AnswerRepo {
    async updateAnswer(answerId, answerData) {
        const answer = await Answer.findByIdAndUpdate(answerId, answerData);
        if (!answer) {
            throw new NotFoundError("answer", answerId);
        }
        return answer;
    }

    async findAnswers(questionId, pagination = {}) {

        // Ensure the question exists
        const question = await Question.findById(questionId);
        if (!question) {
            throw new NotFoundError('Question', questionId);
        }

        const {page = 1, limit = 10} = pagination;
        const skip = (page - 1) * limit;

        return Answer.find({questionId})
            .populate('userId', 'username')  // Populate userId with only the username field
            .skip(skip)
            .limit(limit)
            .sort({createdAt: -1});

    }

    async addComment(commentData){
        const user = await User.findById(commentData.userId);
        if(!user){
            throw new NotFoundError("user",commentData.userId);
        }
        const answer = await Answer.findById(commentData.parentId);
        if(!answer){
            throw new NotFoundError("question",commentData.parentId);
        }
        return Comment.create(commentData);
    }
}

module.exports = AnswerRepo;