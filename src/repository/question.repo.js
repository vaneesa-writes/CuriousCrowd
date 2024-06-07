const Question = require("../models/question.model");
const {isEmptyObject} = require("../utility");
const BadRequestError = require("../error/badRequestError");
const NotFoundError = require("../error/notFoundError");
const {Answer, User} = require("../models");

class QuestionRepo {
    async createQuestion(questionData) {
        const user = await User.findById(questionData.userId);
        if(!user){
            throw new NotFoundError("User",questionData.userId);
        }
        return await Question.create(questionData);
    }

    async searchQuestion(filter, pagination = {}) {
        const query = {};
        if (filter.topics) {
            query.topics = {$in: filter.topics};
        }
        if (filter.text) {
            query.$or = [{title: {$regex: filter.text, $options: 'i'}}, {
                body: {
                    $regex: filter.text,
                    $options: 'i'
                }
            }]
        }
        if(isEmptyObject(query)){
           throw new BadRequestError("text and tag");
        }
        const { page = 1, limit = 10 } = pagination;
        const skip = (page - 1) * limit;

        return Question.find(query)
            .populate('topics', 'name')  // Populate topics with only the name field
            .populate('userId', 'username')  // Populate userId with only the username field
            .skip(skip)
            .limit(limit)
            .sort({createdAt: -1});
    }

    async createAnswer(answerData){

        const user = await User.findById(answerData.userId);
        if(!user){
            throw new NotFoundError("User",answerData.userId);
        }
        const question = await Question.findById(answerData.questionId);
        if(!question){
            throw new NotFoundError("Question",answerData.questionId);
        }
        return Answer.create(answerData);

    }
}

module.exports = QuestionRepo;