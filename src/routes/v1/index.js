const express = require("express");
const v1Router = express.Router();
const userRouter = require("./user.routes");
const questionRouter = require("./question.routes");
const topicRouter = require("./topic.routes");

v1Router.use("/users",userRouter);
v1Router.use("/questions",questionRouter);
v1Router.use("/topics",topicRouter);

module.exports = v1Router;