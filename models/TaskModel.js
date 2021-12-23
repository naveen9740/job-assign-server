const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  editCount: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Task", TaskSchema);
