import React, { useState, useEffect } from "react";

function TaskInput({ addTask, editingTask, updateTask }) {
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTaskText(editingTask.text);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      text: taskText,
      createdAt: new Date()
    };
    editingTask ? updateTask(task) : addTask(task);
    setTaskText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        placeholder="Enter todo"
        onChange={(e) => setTaskText(e.target.value)}
        required
      />
      <button type="submit">{editingTask ? "Update" : "Add"}</button>
    </form>
  );
}

export default TaskInput;





