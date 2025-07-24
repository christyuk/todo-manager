import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";

function TodoPage() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const user = auth.currentUser;

  // 🔁 Fetch Todos
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "todos"), where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosArr);
    });

    return () => unsubscribe();
  }, [user]);

  // ➕ Add Todo
  const handleAdd = async () => {
    if (task.trim() === "") return;

    await addDoc(collection(db, "todos"), {
      text: task,
      uid: user.uid,
      createdAt: new Date(),
    });

    setTask("");
  };

  // ❌ Delete Todo
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <button onClick={() => signOut(auth)}>Logout</button>

      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;












