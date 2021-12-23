const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = 5000;

const Task = require("./models/TaskModel");

mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/", (req, res, next) => {
  console.log("logged", req.path);
  next();
});

app.get("/", (req, res) => {
  res.json({ success: true, msg: "home page" });
});

// get all Tasks
app.get("/get", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ success: true, message: tasks });
  } catch (error) {
    res.json({ success: true, error: error.message });
  }
});

// Create a New Task
app.post("/add", async (req, res) => {
  try {
    const { todo } = req.body;
    const newTask = await new Task({ todo });

    // save task and return response
    const task = await newTask.save();
    res.json({ success: true, message: task });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Update a Task
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let { todo } = req.body;
    const update = await Task.findByIdAndUpdate(id, { $set: req.body });
    res.json({ success: true, message: "Task Updated" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Delete a Task
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.deleteOne({ id });
    res.json({ success: true, message: "Task Deleted!!" });
  } catch (error) {
    res.json({ success: true, message: "Task Updated" });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server started ${process.env.PORT || port}`);
});
