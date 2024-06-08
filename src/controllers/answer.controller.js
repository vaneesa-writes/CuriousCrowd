const {StatusCodes} = require("http-status-codes");
const {AnswerRepo} = require("../repository");
const {AnswerService} = require("../service");

const answerService = new AnswerService(new AnswerRepo());

const updateAnswer = async (req, res, next) => {
    try {
        const answerId = req.params.answerId;
        const answerData = req.body;
        const answer = await answerService.updateAnswer(answerId, answerData);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully updated the answer",
            error: {},
            data: answer
        });
    } catch (error) {
        next(error);
    }
}

const findAnswers = async (req, res, next) =>{
    try{
        const {questionId} = req.params;
        const page = req.query.page;
        const limit = req.query.limit;
        const answers = await answerService.findAnswers(questionId, page, limit);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully fetched the answers",
            error: {},
            data: answers
        });
    }
    catch (error){
        next(error);
    }
}

const addComment = async (req, res, next) => {
    try{
        const answerId = req.params.answerId;
        const userId = req.body.userId;
        const text = req.body.text;
        const comment = await answerService.addComment(answerId,userId,text);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully added the comment",
            error: {},
            data: comment
        });
    }
    catch (error){
        next(error);
    }
}

module.exports = {findAnswers,updateAnswer, addComment};