import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <Link
      to={`/jobs/${job._id}`}
      className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-brand-dark">{job.title}</h3>
          <p className="text-gray-600 text-sm">{job.company} — {job.location}</p>
        </div>
        <span className="text-xs font-semibold bg-brand/10 text-brand px-2 py-1 rounded-full">
          {job.workMode}
        </span>
      </div>

      {(job.salaryMin || job.salaryMax) && (
        <p className="text-sm text-gray-500 mt-2">
          ₹{job.salaryMin ? (job.salaryMin / 100000).toFixed(1) : "?"}L - ₹
          {job.salaryMax ? (job.salaryMax / 100000).toFixed(1) : "?"}L
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-3">
        {job.skillsRequired?.slice(0, 5).map((skill) => (
          <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </Link>
  );
}
