const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    isDone: Boolean
},  { timestamps: true });

const Task = mongoose.model("Task", taskSchema);


module.exports = Task;