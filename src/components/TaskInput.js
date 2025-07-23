import React, { useState, useEffect } from 'react';

function TaskInput({ addTask, editingTask, updateTask }) {
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    if (editingTask) {
      setTaskText(editingTask.text);
      setCategory(editingTask.category);
      setDueDate(editingTask.dueDate);
      setPriority(editingTask.priority || 'Medium');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { text: taskText, category, dueDate, priority };

    if (editingTask) {
      updateTask(task);
    } else {
      addTask(task);
    }

    setTaskText('');
    setCategory('');
    setDueDate('');
    setPriority('Medium');
  };

  return (
    <form className="row g-2 align-items-center mb-4" onSubmit={handleSubmit}>
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          required
        />
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="col">
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="col">
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="col-auto">
        <button className="btn btn-primary" type="submit">
          {editingTask ? 'Update' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}

export default TaskInput;


