const express = require("express");
const connectToDb = require("./config/db.config");
const {PORT} = require("./config/server.config");
app = express();

app.listen(PORT, async () => {
    console.log(`Successfully started the app on port : ${PORT}`);
    await connectToDb();
});
