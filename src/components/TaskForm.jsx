import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // For success message
  const { handleAddTask } = useContext(TaskContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when the user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.title || !formData.description || !formData.dueDate) {
      setError("All fields are required.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for comparison
    const dueDate = new Date(formData.dueDate);

    if (!formData.dueDate || dueDate < today) {
      setError("Please select a valid due date (today or later).");
      return;
    }

    try {
      await handleAddTask(formData); // Use context function to add the task
      setFormData({ title: "", description: "", dueDate: "" }); // Clear the form
      setError(""); // Reset error after successful submission
      setSuccessMessage("Task added successfully!"); // Set success message

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create the task. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded mb-6"
      aria-labelledby="task-form-title"
    >
      <h2 id="task-form-title" className="text-lg font-bold mb-4">
        Add a New Task
      </h2>
      <label htmlFor="task-title" className="block text-sm font-medium mb-1">
        Title
      </label>
      <input
        type="text"
        id="task-title"
        name="title"
        placeholder="Task title"
        className="mb-2 p-2 border rounded w-full"
        value={formData.title}
        onChange={handleChange}
        aria-required="true"
      />

      <label htmlFor="task-description" className="block text-sm font-medium mb-1">
        Description
      </label>
      <textarea
        id="task-description"
        name="description"
        placeholder="Task description"
        className="mb-2 p-2 border rounded w-full"
        value={formData.description}
        onChange={handleChange}
        aria-required="true"
      />

      <label htmlFor="task-dueDate" className="block text-sm font-medium mb-1">
        Due Date
      </label>
      <input
        type="date"
        id="task-dueDate"
        name="dueDate"
        className="mb-2 p-2 border rounded w-full"
        value={formData.dueDate}
        onChange={handleChange}
        aria-required="true"
        min={new Date().toISOString().split("T")[0]} // Ensure only today or future dates are allowed
      />

      {/* Error and success feedback */}
      {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-sm " role="status">
          {successMessage}
        </p>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
        aria-label="Submit new task form"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
