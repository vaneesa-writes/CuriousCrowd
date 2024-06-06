const express = require("express");
const userRouter = express.Router();
const {userController} = require("../../controllers/index");

userRouter.post("/", userController.createUser);
userRouter.get("/:userId",userController.findUser);
userRouter.put("/:userId",userController.updateUser);

module.exports = userRouter;