const mongoose = require("mongoose");
<<<<<<< HEAD
const Task =require("./task");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
=======

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    taskLists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskList",
>>>>>>> 7e824f4fc507f604a945878205e0500c3292e60a
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
<<<<<<< HEAD

})

const User = mongoose.model("User", userSchema);
module.exports = User;
=======
});

const User = mongoose.model("User", userSchema);
module.exports = User;
>>>>>>> 7e824f4fc507f604a945878205e0500c3292e60a
