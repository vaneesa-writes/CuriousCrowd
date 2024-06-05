const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "Username is required"]
    },
    email : {
        type : String,
        required : [true, "Email is required"]
    },
    bio : {
        type : String
    }
})

const User = mongoose.model("User",userSchema);

module.exports = User;