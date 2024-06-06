const mongoose = require("mongoose");

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

function isValidMongoObjectId(id){
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {isEmptyObject, isValidMongoObjectId}