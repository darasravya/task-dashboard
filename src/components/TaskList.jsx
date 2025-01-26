import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const tableHeaders = [
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "Due Date", key: "dueDate" },
    { label: "Completed", key: "completed" },
    { label: "Actions", key: "actions" },
];


const TaskList = () => {
    const { filteredTasks, loadMore, isLoading, hasMore } = useContext(TaskContext);

    return (
        <section aria-labelledby="task-list-title" className="w-full">
            {/* Task Table */}
            <h2 id="task-list-title" className="sr-only">
                Task List
            </h2>
            <div
                className="overflow-x-auto border border-gray-300 rounded-md"
                role="region"
                aria-labelledby="task-table-title"
            >
                <h3 id="task-table-title" className="sr-only">
                    Table of Tasks
                </h3>
                <table
                    className="min-w-full bg-white shadow-md rounded overflow-hidden"
                    role="table"
                    aria-describedby="task-table-description"
                >
                    <caption id="task-table-description" className="sr-only">
                        A table displaying the title, description, due date, completion status, and available actions for each task.
                    </caption>
                    <thead className="bg-gray-100" role="rowgroup">
                        <tr role="row">
                            {tableHeaders.map(({ label, key }) => (
                                <th
                                    key={key}
                                    className="py-2 px-4 text-left"
                                    scope="col"
                                    role="columnheader"
                                >
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody role="rowgroup">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))
                        ) : (
                            <tr role="row">
                                <td
                                    colSpan="5"
                                    className="text-center py-4"
                                    role="cell"
                                    aria-live="polite"
                                >
                                    No tasks available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Load More Button */}
            {!isLoading && hasMore && (
                <div className="mt-4 flex justify-center" role="region" aria-label="Load more tasks">
                    <button
                        onClick={loadMore}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        aria-label="Load more tasks to the list"
                    >
                        Load More
                    </button>
                </div>
            )}

            {/* Loading Spinner */}
            {isLoading && (
                <div className="flex justify-center py-4" role="status" aria-live="polite">
                    <div
                        className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
                        aria-hidden="true"
                    ></div>
                    <span className="sr-only">Loading tasks...</span>
                </div>
            )}
        </section>
    );

};

export default TaskList;
