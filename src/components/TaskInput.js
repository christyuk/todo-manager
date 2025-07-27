import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function TaskInput() {
  const [text, setText] = useState('');
  const [user] = useAuthState(auth);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addDoc(collection(db, 'todos'), {
      text,
      completed: false,
      createdAt: serverTimestamp(),
      uid: user.uid,
    });

    setText('');
  };

  return (
    <form onSubmit={handleAdd} className="flex items-center gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
      >
        Add
      </button>
    </form>
  );
}

export default TaskInput;






