const mongoose = require("mongoose");
const {DB_URL} = require("./server.config");

async function connectToDb(){
    try{
        await mongoose.connect(DB_URL,{dbName : "CuriousCrowd"});
        console.log("Successfully connected to db");
    }
    catch (error){
        console.log("Failed to connect to db");
        console.log(error);
    }
}

module.exports = connectToDb;