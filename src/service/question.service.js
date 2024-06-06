const {isValidMongoObjectId} = require("../utility/index");
const NotFoundError = require("../error/notFoundError");
class QuestionService{
    constructor(questionRepo) {
        this.questionRepo = questionRepo;
    }

    async createQuestion(questionData){
        if(!isValidMongoObjectId(questionData.userId)){
            throw new NotFoundError("User Id",questionData.userId);
        }

        return await this.questionRepo.createQuestion(questionData);
    }

    async searchQuestion(text,tags,page,limit){
        const pagination = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10
        };
        return await this.questionRepo.searchQuestion({topics : tags, text : text},pagination);
    }

    async createAnswer(questionId,userId,text){
        const answerData = {questionId : questionId, userId : userId, text : text};
        return await this.questionRepo.createAnswer(answerData);
    }
}

module.exports = QuestionService;