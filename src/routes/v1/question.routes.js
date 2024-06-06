const express= require("express");
const {questionController} = require("../../controllers");
const questionRouter = express.Router();

questionRouter.post("/",questionController.createQuestion);

module.exports = questionRouter;