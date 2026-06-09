import React, { createContext, useState, useEffect } from "react";

// Creates shared task state so components can access and update tasks without prop drilling.
export const TaskContext = createContext();

// Provides shared task and search state to all task manager components.
export function TaskProvider({ children }) {

     // Stores the list of tasks loaded from and synchronized with the backend.
    const [tasks, setTasks] = useState([]);

     // Stores the current search text used to filter visible tasks.
    const [searchQuery, setSearchQuery] = useState("");

    // Loads initial tasks once when the provider mounts.
    useEffect(() => {
        fetch("http://localhost:6001/tasks")
            .then((r) => r.json())
            .then((data) => setTasks(data));
    }, []);

    // Adds a new task to the backend, then updates local state with the created task.
    function addTask(title) {
        const newTask = {
            title: title,
            completed: false
        }

        fetch("http://localhost:6001/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
            .then((r) => r.json())
            .then((createdTask) => {
                setTasks((currentTasks) => [...currentTasks, createdTask])
            })
    }

    // Toggles a task's completed status in the backend and updates local state.
    function toggleComplete(id, completed) {

        const taskToUpdate = tasks.find(task => task.id === id);
        const newValue = !taskToUpdate.completed;

        fetch(`http://localhost:6001/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                completed: newValue,
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((updatedTask) => {
                setTasks((currentTasks) =>
                    currentTasks.map((task) =>
                        task.id === updatedTask.id ? updatedTask : task
                    )
                );
            })
            .catch((error) => {
                console.error("Failed to update task completion status: ", error)
            })
    }

    return (
        <TaskContext.Provider value={{ tasks, setTasks, toggleComplete, addTask, searchQuery, setSearchQuery }}>
            {children}
        </TaskContext.Provider>
    )
}
