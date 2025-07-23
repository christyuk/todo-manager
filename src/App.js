import React from "react";
import { Routes, Route } from "react-router-dom";
import TodoPage from "./components/TodoPage";
import AuthForm from "./components/AuthForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoPage />} />
      <Route path="/login" element={<AuthForm />} />
    </Routes>
  );
}

export default App;







