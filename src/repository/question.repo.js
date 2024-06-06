const Question = require("../models/question.model");
const {isEmptyObject} = require("../utility");
const BadRequestError = require("../error/badRequestError");
const NotFoundError = require("../error/notFoundError");
const {Answer, User} = require("../models");

class QuestionRepo {
    async createQuestion(questionData) {
        const user = await User.findById(questionData.userId);
        if(!user){
            throw NotFoundError("User",questionData.userId);
        }
        return await Question.create(questionData);
    }

    async searchQuestion(filter, pagination = {}) {
        const query = {};
        if (filter.topics) {
            query.topics = {$in: filter.topics};
        }
        if (filter.text) {
            query.$or = [{title: {$regex: filter.searchTerm, $options: 'i'}}, {
                body: {
                    $regex: filter.searchTerm,
                    $options: 'i'
                }
            }]
        }
        if(isEmptyObject(query)){
           throw new  BadRequestError("text and tag");
        }
        const { page = 1, limit = 10 } = pagination;
        const skip = (page - 1) * limit;

        return await Question.find(query)
            .populate('topics', 'name')  // Populate topics with only the name field
            .populate('userId', 'username')  // Populate userId with only the username field
            .skip(skip)
            .limit(limit)
            .sort({createdAt: -1});
    }

    async createAnswer(answerData){
        return await Answer.create(answerData);
    }
}

module.exports = QuestionRepo;