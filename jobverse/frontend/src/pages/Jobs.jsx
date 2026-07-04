import React, { useEffect, useState } from "react";
import API from "../api/axios";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (workMode) params.workMode = workMode;
      const { data } = await API.get("/jobs", { params });
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold text-brand-dark mb-5">Browse Jobs</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by title, company, or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-brand"
        />
        <select
          value={workMode}
          onChange={(e) => setWorkMode(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">All modes</option>
          <option value="Remote">Remote</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <button type="submit" className="bg-brand text-white px-5 py-2 rounded-lg font-medium">
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500">No jobs found. Try a different search.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
