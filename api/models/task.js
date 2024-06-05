const mongoose =require("mongoose");
const todoSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },

    status:{
        type:String,
        enum:["completed","pending"],
        default:"pending",
    },

    date:{
        type:String,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    },
    notes:{
        type:String,
    }
});

const Task=mongoose.model("Task",todoSchema);

module.exports =Task;