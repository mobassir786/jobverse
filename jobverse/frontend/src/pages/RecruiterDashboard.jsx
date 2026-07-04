import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    API.get("/jobs/mine").then((res) => setJobs(res.data));
  }, []);

  const viewApplicants = async (job) => {
    setSelectedJob(job);
    const { data } = await API.get(`/applications/job/${job._id}`);
    setApplicants(data);
  };

  const updateStatus = async (appId, status) => {
    await API.put(`/applications/${appId}/status`, { status });
    setApplicants((prev) => prev.map((a) => (a._id === appId ? { ...a, status } : a)));
  };

  const statusColors = {
    Applied: "bg-gray-100 text-gray-600",
    Shortlisted: "bg-blue-100 text-blue-600",
    Interview: "bg-amber-100 text-amber-700",
    Hired: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-600",
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark mb-4">My Job Postings</h1>
        <div className="space-y-3">
          {jobs.length === 0 && (
            <p className="text-gray-500">You haven't posted any jobs yet.</p>
          )}
          {jobs.map((job) => (
            <button
              key={job._id}
              onClick={() => viewApplicants(job)}
              className={`w-full text-left bg-white border rounded-xl p-4 hover:shadow-md transition ${
                selectedJob?._id === job._id ? "border-brand" : "border-gray-200"
              }`}
            >
              <p className="font-semibold text-brand-dark">{job.title}</p>
              <p className="text-sm text-gray-500">{job.location} · {job.workMode}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-brand-dark mb-4">
          {selectedJob ? `Applicants — ${selectedJob.title}` : "Select a job to see applicants"}
        </h2>
        <div className="space-y-3">
          {selectedJob && applicants.length === 0 && (
            <p className="text-gray-500">No applications yet for this job.</p>
          )}
          {applicants.map((app) => (
            <div key={app._id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{app.candidate?.name}</p>
                  <p className="text-sm text-gray-500">{app.candidate?.email}</p>
                  {app.candidate?.resumeLink && (
                    <a href={app.candidate.resumeLink} target="_blank" rel="noreferrer"
                      className="text-sm text-brand font-medium">View Resume ↗</a>
                  )}
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[app.status]}`}>
                  {app.status}
                </span>
              </div>
              {app.coverNote && <p className="text-sm text-gray-600 mt-2">"{app.coverNote}"</p>}
              <select
                value={app.status}
                onChange={(e) => updateStatus(app._id, e.target.value)}
                className="mt-3 border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
              >
                <option>Applied</option>
                <option>Shortlisted</option>
                <option>Interview</option>
                <option>Hired</option>
                <option>Rejected</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
