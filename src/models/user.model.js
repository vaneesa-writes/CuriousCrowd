const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String, required: [true, "Username is required"]
    }, email: {
        type: String, required: [true, "Email is required"], unique: true
    }, bio: {
        type: String
    }
})

userSchema.index({email: 1});

const User = mongoose.model("User", userSchema);

module.exports = User;