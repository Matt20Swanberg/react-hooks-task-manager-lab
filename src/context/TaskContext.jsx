import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch("http://localhost:6001/tasks")
            .then((r) => r.json())
            .then((data) => setTasks(data));
    }, []);

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

    return (
        <TaskContext.Provider value={{ tasks, setTasks, toggleComplete, addTask, searchQuery, setSearchQuery }}>
            {children}
        </TaskContext.Provider>
    )
}
