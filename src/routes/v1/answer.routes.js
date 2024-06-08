const express= require("express");
const {answerController} = require("../../controllers");
const answerRouter = express.Router();

answerRouter.put("/:answerId",answerController.updateAnswer);
answerRouter.get("/:questionId",answerController.findAnswers);
answerRouter.post("/:answerId/comments",answerController.addComment);

module.exports = answerRouter;