const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    workMode: { type: String, enum: ["Remote", "Onsite", "Hybrid"], default: "Remote" },
    description: { type: String, required: true },
    skillsRequired: [{ type: String, trim: true }],
    salaryMin: { type: Number },
    salaryMax: { type: Number },
    experienceLevel: { type: String, enum: ["Fresher", "0-1 years", "1-3 years", "3+ years"], default: "Fresher" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Lets the frontend search jobs by title, company or skills quickly
jobSchema.index({ title: "text", company: "text", skillsRequired: "text" });

module.exports = mongoose.model("Job", jobSchema);
