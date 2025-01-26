import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const FilterBar = () => {
  const { setFilter } = useContext(TaskContext);

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update the filter state in context
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 w-full max-w-lg border border-gray-200 mb-6">
      <span className="font-medium text-gray-600">Filter Tasks:</span>
      <div className="relative w-full">
        <select
          className="block w-full p-3 rounded-md border border-gray-300 bg-gray-50 text-gray-700 font-medium appearance-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:bg-white transition"
          onChange={handleFilterChange}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        {/* Custom Dropdown Arrow */}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
