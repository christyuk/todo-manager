import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = updatedTask;
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const categories = [...new Set(tasks.map(task => task.category))];

  const filteredTasks = tasks.filter((task) => {
    const matchCategory = filterCategory ? task.category === filterCategory : true;
    const matchDate = filterDate ? task.dueDate === filterDate : true;
    return matchCategory && matchDate;
  });

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Todo Manager</h1>

      <TaskInput
        addTask={addTask}
        editingTask={editingIndex !== null ? tasks[editingIndex] : null}
        updateTask={updateTask}
      />

      {/* Filter UI */}
      <div className="mb-4 d-flex gap-3">
        <select
          className="form-select w-auto"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="date"
          className="form-control w-auto"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            setFilterCategory('');
            setFilterDate('');
          }}
        >
          Clear Filters
        </button>
      </div>

      <ul className="list-group">
        {filteredTasks.map((task, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.text}</strong> — <em>{task.category}</em> — {task.dueDate} —
              <span className={`ms-2 badge ${
                task.priority === 'High' ? 'bg-danger' :
                task.priority === 'Medium' ? 'bg-warning text-dark' :
                'bg-success'
              }`}>
                {task.priority}
              </span>
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() => startEditing(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;






