const {QuestionService} = require("../service")
const {QuestionRepo} = require("../repository");
const {StatusCodes} = require("http-status-codes");

const questionService = new QuestionService(new QuestionRepo());

const createQuestion = async (req, res, next) => {
    try {
        const questionData = req.body;
        const question = await questionService.createQuestion(questionData);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully created the question",
            error: {},
            data: question
        });
    } catch (error) {
        next(error);
    }
}

const searchQuestion = async (req,res,next) =>{
    try{
        const text = req.body.text;
        const tags = req.body.tags;
        const page = req.query.page;
        const limit = req.query.limit;
        const questions = await questionService.searchQuestion(text,tags,page,limit);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully fetched the questions",
            error: {},
            data: questions
        });
    }
    catch (error) {
        next(error);
    }
}

const createAnswer = async (req, res, next) => {
    try{
        const questionId = req.params.questionId;
        const userId = req.body.userId;
        const text = req.body.text;
        const page = req.query.page;
        const limit = req.query.limit;
        const answer = await questionService.createAnswer(questionId, userId, text, page, limit);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully created the answer.",
            error: {},
            data: answer
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    createQuestion,
    searchQuestion,
    createAnswer
}