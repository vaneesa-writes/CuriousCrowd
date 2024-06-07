const Question = require("../models/question.model");
const {isEmptyObject} = require("../utility");
const BadRequestError = require("../error/badRequestError");
const NotFoundError = require("../error/notFoundError");
const {Answer, User, Topic} = require("../models");

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

        // Array to hold the conditions for the $or operator
        const orConditions = [];

        // Topics condition
        if (filter.topics) {
            for (const topic of filter.topics) {
                if (!await Topic.findById(topic)) {
                    console.log("Not found topic");
                    throw new NotFoundError("Topic", topic);
                }
            }
            orConditions.push({ topics: { $in: filter.topics } });
        }

        // Text condition
        if (filter.text) {
            orConditions.push({
                $or: [
                    { title: { $regex: filter.text, $options: 'i' } },
                    { body: { $regex: filter.text, $options: 'i' } }
                ]
            });
        }

        // Add the $or conditions to the query if there are any
        if (orConditions.length > 0) {
            query.$or = orConditions;
        }

        // If query object is still empty, throw BadRequestError
        if (isEmptyObject(query)) {
            throw new BadRequestError("text and tag");
        }

        const { page = 1, limit = 10 } = pagination;
        const skip = (page - 1) * limit;

        return Question.find(query)
            .populate('topics', 'name')  // Populate topics with only the name field
            .populate('userId', 'username')  // Populate userId with only the username field
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
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