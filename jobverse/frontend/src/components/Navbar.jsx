import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-brand-dark text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold tracking-tight">
        JobVerse
      </Link>
      <div className="flex items-center gap-5 text-sm font-medium">
        <Link to="/jobs" className="hover:text-brand transition">Browse Jobs</Link>

        {user && user.role === "recruiter" && (
          <>
            <Link to="/recruiter/dashboard" className="hover:text-brand transition">My Postings</Link>
            <Link to="/recruiter/post-job" className="hover:text-brand transition">Post a Job</Link>
          </>
        )}

        {user && user.role === "candidate" && (
          <Link to="/candidate/dashboard" className="hover:text-brand transition">My Applications</Link>
        )}

        {user ? (
          <>
            <span className="text-gray-300">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-brand transition">Login</Link>
            <Link to="/register" className="bg-brand px-3 py-1.5 rounded-lg hover:bg-brand/80 transition">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
