const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const tasks = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Task ${i + 1}`,
  description: `Description for Task ${i + 1}`,
  dueDate: new Date().toISOString().split("T")[0],
  completed: i % 2 === 0, // Alternate between completed and incomplete
}));

//Get tasks with pagination
app.get("/tasks", (req, res) => {
  const startIndex = parseInt(req.query.index) || 0
  const endIndex = startIndex + 10
  const paginatedTasks = tasks.slice(startIndex, endIndex);
  res.json({
        tasks: paginatedTasks,
        total: tasks.length, // Total count of tasks
      });
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title || !description || !dueDate) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    dueDate,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json({newTask, total: tasks.length});
});

// Update a task (mark as completed)
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const task = tasks.find((task) => task.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  task.completed = completed !== undefined ? completed : task.completed;
  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send({});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
