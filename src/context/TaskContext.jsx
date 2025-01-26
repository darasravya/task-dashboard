import React, { createContext, useState, useEffect } from "react";
import { getTasks, createTask, deleteTask } from "../api/taskApi";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); // All loaded tasks
  const [total, setTotal] = useState(0); // Total tasks on the server
  const [filter, setFilter] = useState("all"); // Filter type
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Tracks if more tasks are available

  // Fetch tasks from the API
  const fetchTasks = async (index = 0, reset = false) => {
    setIsLoading(true);
    try {
      const { tasks: fetchedTasks, total } = await getTasks(index);

      setTasks((prevTasks) => {
        // Reset tasks if requested, otherwise append
        return reset ? fetchedTasks : [...prevTasks, ...fetchedTasks];
      });

      setTotal(total);
      setHasMore(index + fetchedTasks.length < total);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchTasks(0, true); // Fetch and reset tasks on initial load
  }, []);

  useEffect(()=>{
    if (tasks.length >= total) {
        setHasMore(false);
      } else{
        setHasMore(true);
      }
  }, [total])

  // Load more tasks
  const loadMore = async () => {
    if (hasMore && !isLoading) {
      await fetchTasks(tasks.length);
    }
  };

  // Add a new task
  const handleAddTask = async (newTask) => {
    try {
      const { total } = await createTask(newTask); // Add the task to the server
      setTotal(total);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId); // Delete the task from the server
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
      setTotal(total-1);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Filter tasks based on the filter state
  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true;
    });
  };

  // Memoized filtered tasks
  const filteredTasks = getFilteredTasks();

  return (
    <TaskContext.Provider
      value={{
        setTasks,
        filteredTasks, 
        setFilter,
        loadMore,
        isLoading,
        hasMore,
        handleAddTask,
        handleDeleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
