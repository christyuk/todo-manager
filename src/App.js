import React, { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import TodoPage from "./components/TodoPage";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {user ? <TodoPage /> : <AuthForm />}
    </div>
  );
}

export default App;
// trigger redeploy









