import React, { useRef, useState, useContext } from "react";
import TaskList from "./TaskList";
import { TaskContext } from "../context/TaskContext";

function SearchBar() {

  // Local form state for the task being created.
  const searchRef = useRef(null);

  // Accesses the global task creation function from context.
  const { searchTask, setSearchQuery } = useContext(TaskContext)

  function handleSearch() {
    setSearchQuery(searchRef.current.value);
  }

  return (
    <div>
      <input
        ref={searchRef}
        type="text"
        placeholder="Search tasks..."
        value={searchTask}
        onChange={handleSearch}
      />
      <TaskList />
    </div>
  );
}

export default SearchBar;
