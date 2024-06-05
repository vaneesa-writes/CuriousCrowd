const mongoose = require("mongoose");

const topicSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    }
});

const Topic = mongoose.model("Topic",topicSchema);

module.exports = Topic;
