const express= require("express");
const {questionController} = require("../../controllers");
const questionRouter = express.Router();

questionRouter.post("/",questionController.createQuestion);
questionRouter.post("/search",questionController.searchQuestion);
questionRouter.post("/:questionId/answers",questionController.createAnswer);

module.exports = questionRouter;