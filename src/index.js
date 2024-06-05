const express = require("express");
const connectToDb = require("./config/db.config");
const {PORT} = require("./config/server.config");
const User = require("./models/user.model");
const Topic = require("./models/topic.model");
app = express();

app.listen(PORT, async () => {
    console.log(`Successfully started the app on port : ${PORT}`);
    await connectToDb();
});
