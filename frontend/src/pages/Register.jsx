import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
    company: "",
    resumeLink: "",
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await register(form);
      navigate(data.role === "recruiter" ? "/recruiter/dashboard" : "/candidate/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-brand-dark mb-6">Create your JobVerse account</h2>

      {error && <p className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setForm({ ...form, role: "candidate" })}
            className={`flex-1 py-2 rounded-lg border font-medium ${
              form.role === "candidate" ? "bg-brand text-white border-brand" : "border-gray-300 text-gray-600"
            }`}
          >
            I'm a Candidate
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, role: "recruiter" })}
            className={`flex-1 py-2 rounded-lg border font-medium ${
              form.role === "recruiter" ? "bg-brand text-white border-brand" : "border-gray-300 text-gray-600"
            }`}
          >
            I'm a Recruiter
          </button>
        </div>

        <input
          type="text" name="name" placeholder="Full name" value={form.name}
          onChange={handleChange} required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-brand"
        />
        <input
          type="email" name="email" placeholder="Email" value={form.email}
          onChange={handleChange} required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-brand"
        />
        <input
          type="password" name="password" placeholder="Password (min 6 characters)" value={form.password}
          onChange={handleChange} required minLength={6}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-brand"
        />

        {form.role === "recruiter" ? (
          <input
            type="text" name="company" placeholder="Company name" value={form.company}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-brand"
          />
        ) : (
          <input
            type="text" name="resumeLink" placeholder="Resume link (optional)" value={form.resumeLink}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-brand"
          />
        )}

        <button
          type="submit"
          className="w-full bg-brand text-white font-semibold py-2.5 rounded-lg hover:bg-brand/90 transition"
        >
          Create Account
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-brand font-medium">Log in</Link>
      </p>
    </div>
  );
}
