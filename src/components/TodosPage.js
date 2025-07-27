import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';

function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'todos'),
      where('uid', '==', auth.currentUser.uid),
      orderBy('createdAt')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      await addDoc(collection(db, 'todos'), {
        text: newTodo,
        uid: auth.currentUser.uid,
        completed: false,
        createdAt: new Date(),
      });
      setNewTodo('');
    }
  };

  const toggleTodo = async (todo) => {
    const todoRef = doc(db, 'todos', todo.id);
    await updateDoc(todoRef, {
      completed: !todo.completed,
    });
  };

  const startEditing = (todo) => {
    setEditTodoId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = async (id) => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      text: editText,
    });
    setEditTodoId(null);
    setEditText('');
  };

  const deleteTodo = async (id) => {
    const todoRef = doc(db, 'todos', id);
    await deleteDoc(todoRef);
  };

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  const renderTodo = (todo) => (
    <div
      key={todo.id}
      className="flex justify-between items-center p-2 border rounded shadow-sm mb-2 bg-white hover:bg-gray-50 transition"
    >
      {editTodoId === todo.id ? (
        <input
          className="flex-grow mr-2 border p-1 rounded"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span
          onClick={() => toggleTodo(todo)}
          className={`flex-grow cursor-pointer ${
            todo.completed ? 'line-through text-gray-400' : ''
          }`}
        >
          {todo.text}
        </span>
      )}

      {editTodoId === todo.id ? (
        <button
          onClick={() => saveEdit(todo.id)}
          className="text-green-600 hover:text-green-800 px-2"
        >
          💾
        </button>
      ) : (
        <button
          onClick={() => startEditing(todo)}
          className="text-blue-500 hover:text-blue-700 px-2"
        >
          ✏️
        </button>
      )}
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700 px-2"
      >
        ❌
      </button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">📝 My Todos</h1>
      <div className="flex mb-4">
        <input
          className="flex-grow p-2 border rounded-l"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-2">
        Total: {todos.length} | Completed: {completedTodos.length}
      </p>

      <h2 className="text-lg font-semibold mt-4">Active</h2>
      {activeTodos.map(renderTodo)}

      <h2 className="text-lg font-semibold mt-6">Completed</h2>
      {completedTodos.map(renderTodo)}

      <button
        onClick={() => signOut(auth)}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
      >
        Logout
      </button>
    </div>
  );
}

export default TodosPage;































