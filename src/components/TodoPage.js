import React, { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
  query,
  orderBy
} from "firebase/firestore";
import { signOut } from "firebase/auth"; // 👈 import signOut
import { useNavigate } from "react-router-dom";

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [editingTask] = useState(null);
  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTodos(list);
    });
    return () => unsubscribe();
  }, []);

  const addTask = async (task) => {
    await addDoc(collection(db, "todos"), task);
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Your Todo List</h1>
        <button onClick={handleLogout} style={{ height: "2rem" }}>
          Logout
        </button>
      </div>

      <TaskInput addTask={addTask} editingTask={editingTask} updateTask={() => {}} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button
              onClick={() => deleteTask(todo.id)}
              style={{ marginLeft: "1rem", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;








