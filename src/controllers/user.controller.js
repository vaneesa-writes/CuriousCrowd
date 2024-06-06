const {UserService} = require("../service/index");
const {UserRepo} = require("../repository/index");
const {StatusCodes} = require("http-status-codes");

const userService = new UserService(new UserRepo());

async function createUser(req, res, next) {
    try {
        const user = await userService.createUser(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully added the user",
            error: {},
            data: user
        });
    } catch (error) {
        next(error);
    }
}

async function findUser(req,res,next){
    try{
        const user = await userService.findUser(req.params.userId);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully retrieved the user",
            error: {},
            data: user
        });
    }
    catch (error) {
        next(error);
    }
}

async function updateUser(req, res, next){
    try{
        const userId = req.params.userId;
        const {username,email,bio} = req.body;
        const user = await userService.updateUser(userId,{username,email,bio});
        return res.status(StatusCodes.Ok).json({
            success: true,
            message: "Successfully updated the user",
            error: {},
            data: user
        });
    }
    catch (error){
        next(error);
    }
}

module.exports = {
    createUser,
    findUser,
    updateUser
}