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
        console.log(error);
        next(error);
    }
}

module.exports = {
    createQuestion
}