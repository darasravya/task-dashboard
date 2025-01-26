import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";

const Dashboard = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      <TaskForm />
      <FilterBar />
      <TaskList />
    </div>
  );
};

export default Dashboard;
