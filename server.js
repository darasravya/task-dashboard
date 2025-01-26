const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Sample data
let tasks = [
  {
    id: 1,
    title: "Complete React Project",
    description: "Finish implementing the task dashboard",
    dueDate: "2025-01-30",
    completed: false,
  },
  {
    id: 2,
    title: "Buy Groceries",
    description: "Get milk, eggs, and bread from the store",
    dueDate: "2025-01-25",
    completed: true,
  },
  {
    id: 3,
    title: "Plan Weekend Trip",
    description: "Research places to visit and prepare an itinerary",
    dueDate: "2025-01-28",
    completed: false,
  },
  {
    id: 4,
    title: "Plan Weekend Trip",
    description: "Research places to visit and prepare an itinerary",
    dueDate: "2025-01-28",
    completed: false,
  },
  {
    id: 5,
    title: "Plan Weekend Trip",
    description: "Research places to visit and prepare an itinerary",
    dueDate: "2025-01-28",
    completed: false,
  },
  {
    id: 6,
    title: "Plan Weekend Trip",
    description: "Research places to visit and prepare an itinerary",
    dueDate: "2025-01-28",
    completed: false,
  },
  {
    id: 7,
    title: "Plan Weekend Trip",
    description: "Research places to visit and prepare an itinerary",
    dueDate: "2025-01-28",
    completed: false,
  },
  {
    id: 8,
    title: "Plan Weekend Trip",
    description: "Research places to visit and prepare an itinerary",
    dueDate: "2025-01-28",
    completed: false,
  },
  {
    id: 9,
    title: "Plan Weekend Trip",
    description: "Research places to visit and prepare an itinerary",
    dueDate: "2025-01-28",
    completed: false,
  },
  {
    id: 10,
    title: "Plan Weekend Trip",
    description: "Research places to visit and prepare an itinerary",
    dueDate: "2025-01-28",
    completed: false,
  },
  {
    id: 11,
    title: "Plan Weekday Work",
    description: "Research on tasks",
    dueDate: "2025-01-28",
    completed: true,
  },
  {
    id: 12,
    title: "Plan Weekend Trip",
    description: "Research places to visit and prepare an itinerary",
    dueDate: "2025-01-28",
    completed: false,
  },
];

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
