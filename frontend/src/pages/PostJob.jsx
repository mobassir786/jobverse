import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    workMode: "Remote",
    description: "",
    skillsRequired: "",
    salaryMin: "",
    salaryMax: "",
    experienceLevel: "Fresher",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/jobs", {
        ...form,
        skillsRequired: form.skillsRequired.split(",").map((s) => s.trim()).filter(Boolean),
        salaryMin: Number(form.salaryMin) * 100000,
        salaryMax: Number(form.salaryMax) * 100000,
      });
      navigate("/recruiter/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold text-brand-dark mb-5">Post a New Job</h1>

      {error && <p className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <input name="title" placeholder="Job title" value={form.title} onChange={handleChange} required
          className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        <input name="company" placeholder="Company name" value={form.company} onChange={handleChange} required
          className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        <input name="location" placeholder="Location (e.g. Bengaluru, India)" value={form.location} onChange={handleChange} required
          className="w-full border border-gray-300 rounded-lg px-4 py-2" />

        <select name="workMode" value={form.workMode} onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2">
          <option value="Remote">Remote</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <textarea name="description" placeholder="Job description" value={form.description} onChange={handleChange} required rows={5}
          className="w-full border border-gray-300 rounded-lg px-4 py-2" />

        <input name="skillsRequired" placeholder="Skills (comma separated, e.g. React, Node.js, MongoDB)"
          value={form.skillsRequired} onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2" />

        <div className="flex gap-4">
          <input name="salaryMin" type="number" placeholder="Min salary (LPA)" value={form.salaryMin} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          <input name="salaryMax" type="number" placeholder="Max salary (LPA)" value={form.salaryMax} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        </div>

        <button type="submit" className="bg-brand text-white px-6 py-2.5 rounded-lg font-semibold">
          Publish Job
        </button>
      </form>
    </div>
  );
}
