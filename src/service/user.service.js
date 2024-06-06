const ConflictError = require("../error/conflictError");
class UserService{
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async createUser(userData){
        try{
            return await this.userRepo.createUser(userData);
        }
        catch(error){
            // handling the error case where email is already registered
            if(error.code === 11000){
                throw new ConflictError("user",userData.email);
            }
            throw error;
        }
    }

    async findUser(userId){
        return this.userRepo.findUser(userId);
    }

    async updateUser(userId,userData){
        try{
            const update = {}
            for(const key in userData){
                if(userData[key] !== undefined){
                    update[key] = userData[key];
                }
            }
            return await this.userRepo.updateUser(userId,update);
        }
        catch (error){
            // handling the error case where email is already registered
            if(error.code === 11000){
                throw new ConflictError("user",userData.email);
            }
            throw error;
        }

    }
}

module.exports = UserService;