const {Topic} = require("../models");
class TopicRepo {
    async createTopic(topicName) {
        return await Topic.create({name: topicName});
    }

    async getTopics(pagination = {}) {
        const {page = 1, limit = 10} = pagination;
        const skip = (page - 1) * limit;
        return Topic.find({}).skip(skip).limit(limit);
    }
}

module.exports = TopicRepo;