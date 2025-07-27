// src/components/Navbar.js
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../AuthContext";

function Navbar() {
  const { user } = useAuth();

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav className="p-4 bg-gray-200 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
        <Link to="/login">Login</Link>
      </div>
      {user && (
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;




