const mongoose = require("mongoose");
const {DB_URL} = require("./server.config");
const logger = require("./logger.config");

async function connectToDb(){
    try{
        await mongoose.connect(DB_URL,{dbName : "CuriousCrowd"});
        logger.info("Successfully connected to db");
    }
    catch (error){
        logger.warn("Failed to connect to db");
        logger.info(error);
    }
}

module.exports = connectToDb;