import React, { useState, useId, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {

  // Tracks the current value entered into the task input field.
  const [taskName, setTaskName] = useState("");

  // Retrieves the context function used to create new tasks.
  const { addTask } = useContext(TaskContext);

  // Generates a stable unique id to connect the label and input for accessibility.
  const taskInputId = useId();

  // Prevents empty submissions, then delegates task creation to context.
  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() === "") return;
    addTask(taskName);
    setTaskName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={taskInputId}>New Task:</label>
      <input
        id={taskInputId}
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
