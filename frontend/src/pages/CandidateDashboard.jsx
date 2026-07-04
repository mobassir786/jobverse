import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function CandidateDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    API.get("/applications/mine").then((res) => setApplications(res.data));
  }, []);

  const statusColors = {
    Applied: "bg-gray-100 text-gray-600",
    Shortlisted: "bg-blue-100 text-blue-600",
    Interview: "bg-amber-100 text-amber-700",
    Hired: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-600",
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold text-brand-dark mb-5">My Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">You haven't applied to any jobs yet. Go browse some!</p>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app._id} className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-brand-dark">{app.job?.title}</p>
                <p className="text-sm text-gray-500">{app.job?.company} — {app.job?.location}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[app.status]}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
