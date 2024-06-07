const {TopicRepo} = require("../repository");
const {TopicService} = require("../service");
const {StatusCodes} = require("http-status-codes");

const topicService = new TopicService(new TopicRepo());

async function createTopic(req, res, next) {
    try {
        const name = req.body.name;
        const topic = await topicService.createTopic(name);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully added the topic",
            error: {},
            data: topic
        });
    }
    catch (error) {
        next(error)
    }
}

async function getTopics(req, res, next){
    try {
        const page = req.query.page;
        const limit = req.query.limit;
        const topics = await topicService.getTopics(page, limit);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully retrieved the topics",
            error: {},
            data: topics
        });
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    createTopic,
    getTopics
}
