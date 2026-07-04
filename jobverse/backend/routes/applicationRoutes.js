const express = require("express");
const Application = require("../models/Application");
const Job = require("../models/Job");
const { protect, requireRole } = require("../middleware/auth");

const router = express.Router();

// POST /api/applications  -> candidate applies to a job
router.post("/", protect, requireRole("candidate"), async (req, res) => {
  try {
    const { jobId, coverNote } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const alreadyApplied = await Application.findOne({ job: jobId, candidate: req.user._id });
    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied to this job" });
    }

    const application = await Application.create({
      job: jobId,
      candidate: req.user._id,
      coverNote,
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/applications/mine  -> candidate's own applications with job info
router.get("/mine", protect, requireRole("candidate"), async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.user._id })
      .populate("job")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/applications/job/:jobId  -> recruiter sees applicants for their job
router.get("/job/:jobId", protect, requireRole("recruiter"), async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only view applicants for your own jobs" });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate("candidate", "name email resumeLink")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/applications/:id/status  -> recruiter updates an applicant's status
router.put("/:id/status", protect, requireRole("recruiter"), async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id).populate("job");

    if (!application) return res.status(404).json({ message: "Application not found" });
    if (application.job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your job posting" });
    }

    application.status = status;
    await application.save();
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
