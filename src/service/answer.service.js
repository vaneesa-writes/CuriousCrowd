const {isValidMongoObjectId} = require("../utility/index");
const NotFoundError = require("../error/notFoundError");

class AnswerService{
    constructor(answerRepo) {
        this.answerRepo = answerRepo;
    }

    async updateAnswer(answerId, answerData){
        if(!isValidMongoObjectId(answerId)){
            throw new NotFoundError("answer",answerId);
        }
        return await this.answerRepo.updateAnswer(answerId,answerData);
    }

    async findAnswers(questionId, page, limit){
        const pagination = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10
        };
        if(!isValidMongoObjectId(questionId)){
            throw new NotFoundError("question",questionId);
        }
        return this.answerRepo.findAnswers(questionId,pagination);
    }

    async addComment(answerId, userId, text){
        if(!isValidMongoObjectId(answerId)){
            throw new NotFoundError("answer",answerId);
        }
        if(!isValidMongoObjectId(userId)){
            throw new NotFoundError("user",userId);
        }

        const commentData = {parentId : answerId, userId : userId, text : text, parentModel : "Answer"};

        return await this.answerRepo.addComment(commentData);
    }
}

module.exports = AnswerService;