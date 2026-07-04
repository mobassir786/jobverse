import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import PostJob from "./pages/PostJob";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/recruiter/post-job"
          element={<PrivateRoute role="recruiter"><PostJob /></PrivateRoute>}
        />
        <Route
          path="/recruiter/dashboard"
          element={<PrivateRoute role="recruiter"><RecruiterDashboard /></PrivateRoute>}
        />
        <Route
          path="/candidate/dashboard"
          element={<PrivateRoute role="candidate"><CandidateDashboard /></PrivateRoute>}
        />
      </Routes>
    </div>
  );
}
