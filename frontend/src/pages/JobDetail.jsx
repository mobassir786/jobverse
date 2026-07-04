import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function JobDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [coverNote, setCoverNote] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get(`/jobs/${id}`).then((res) => setJob(res.data));
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await API.post("/applications", { jobId: id, coverNote });
      setMessage("Applied successfully! Check 'My Applications' to track status.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  if (!job) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-brand-dark">{job.title}</h1>
        <p className="text-gray-600 mt-1">{job.company} — {job.location} · {job.workMode}</p>

        {(job.salaryMin || job.salaryMax) && (
          <p className="text-gray-500 mt-2">
            ₹{(job.salaryMin / 100000).toFixed(1)}L - ₹{(job.salaryMax / 100000).toFixed(1)}L
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {job.skillsRequired?.map((skill) => (
            <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>

        <p className="mt-5 text-gray-700 whitespace-pre-line">{job.description}</p>
      </div>

      {user?.role === "candidate" && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mt-5">
          <h2 className="font-semibold text-brand-dark mb-3">Apply to this job</h2>
          {message ? (
            <p className="text-green-600 font-medium">{message}</p>
          ) : (
            <form onSubmit={handleApply} className="space-y-3">
              <textarea
                placeholder="Short note to the recruiter (optional)"
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-brand"
              />
              <button type="submit" className="bg-brand text-white px-5 py-2 rounded-lg font-medium">
                Submit Application
              </button>
            </form>
          )}
        </div>
      )}

      {!user && (
        <p className="mt-5 text-gray-500">
          <a href="/login" className="text-brand font-medium">Log in</a> as a candidate to apply.
        </p>
      )}
    </div>
  );
}
