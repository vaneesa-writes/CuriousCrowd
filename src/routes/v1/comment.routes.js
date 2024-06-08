const express = require("express");
const { commentController} = require("../../controllers");

const commentRouter = express.Router();

commentRouter.get("/:parentId",commentController.findCommentByParentId);
commentRouter.post("/:commentId",commentController.addComment);

module.exports = commentRouter;