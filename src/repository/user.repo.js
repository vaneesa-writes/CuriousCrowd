const logger = require("../config/logger.config");
const User = require("../models/user.model");
const getRelativePathToProjectRoot = require("../utility/filePathFinder");
const NotFoundError = require("../error/notFoundError");

class UserRepo {
    async createUser(userDate) {
        try {
            return await User.create({
                username: userDate.username, email: userDate.email
            });
        } catch (error) {
            logger.error(`${getRelativePathToProjectRoot(__filename)} : User creation failed for user ${userDate.email}`);
            throw error;
        }
    }

    async findUser(userId) {
        const user = await User.findById(userId);
        if (!user){
            logger.info(`${getRelativePathToProjectRoot(__filename)} : User not found with id ${userId}`)
            throw new NotFoundError("User",userId);
        }
        return user;
    }

    async updateUser(userId,userData){
        const user = await User.findByIdAndUpdate(userId,userData);
        if (!user){
            logger.info(`${getRelativePathToProjectRoot(__filename)} : User not found with id ${userId}`)
            throw new NotFoundError("User",userId);
        }
        return user;
    }
}

module.exports = UserRepo;