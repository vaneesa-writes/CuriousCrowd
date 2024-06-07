const ConflictError = require("../error/conflictError");

class TopicService{
    constructor(topicRepo) {
        this.topicRepo = topicRepo;
    }

    async createTopic(topicName){
        try{
            return await this.topicRepo.createTopic(topicName);
        }
        catch(error){
            // handling the error case where topicName is already registered
            if(error.code === 11000){
                throw new ConflictError("Topic",topicName);
            }
            throw error;
        }
    }

    async getTopics(page, limit){
        const pagination = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10
        };
        return await this.topicRepo.getTopics(pagination);
    }
}

module.exports = TopicService;