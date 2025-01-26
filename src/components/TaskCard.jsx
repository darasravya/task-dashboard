import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { updateTask } from "../api/taskApi";

const TaskCard = ({ task }) => {
    const { setTasks, handleDeleteTask } = useContext(TaskContext);

    const handleComplete = async () => {
        try {
            const updatedTask = await updateTask(task.id, { completed: true });
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
            );
        } catch (error) {
            console.error("Error marking task as complete:", error);
        }
    };

    return (
        <tr key={task.id} className="hover:bg-gray-100" role="row">
            <td
                className="py-2 px-4 border-b"
                role="cell"
                aria-label={`Task title: ${task.title}`}
            >
                {task.title}
            </td>
            <td
                className="py-2 px-4 border-b"
                role="cell"
                aria-label={`Task description: ${task.description}`}
            >
                {task.description}
            </td>
            <td
                className="py-2 px-4 border-b"
                role="cell"
                aria-label={`Due date: ${task.dueDate}`}
            >
                {task.dueDate}
            </td>
            <td
                className="py-2 px-4 border-b"
                role="cell"
                aria-label={`Completion status: ${task.completed ? "Completed" : "Incomplete"
                    }`}
            >
                {task.completed ? "Yes" : "No"}
            </td>
            <td
                className="py-2 px-4 border-b flex space-x-2"
                role="cell"
                aria-label="Task actions"
            >
                <button
                    onClick={handleComplete}
                    disabled={task.completed}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 duration-200 disabled:bg-gray-300"
                    aria-label={`Mark task "${task.title}" as completed`}
                >
                    Mark as Completed
                </button>
                <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                    aria-label={`Delete task "${task.title}"`}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default TaskCard;
