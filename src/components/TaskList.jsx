import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList() {

  // Gets tasks, search text, and toggle behavior from global task context.
  const { tasks, searchQuery, toggleComplete } = useContext(TaskContext);

  // Shows only tasks whose titles match the current search query.
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </span>
          <button
            onClick={() => toggleComplete(task.id)}
            data-testid={task.id}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
