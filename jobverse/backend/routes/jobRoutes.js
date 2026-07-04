const express = require("express");
const Job = require("../models/Job");
const { protect, requireRole } = require("../middleware/auth");

const router = express.Router();

// GET /api/jobs  -> everyone can browse, supports ?search= and ?workMode=
router.get("/", async (req, res) => {
  try {
    const { search, workMode } = req.query;
    const filter = { isActive: true };

    if (workMode) filter.workMode = workMode;
    if (search) {
      filter.$text = { $search: search };
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 }).populate("recruiter", "name company");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/jobs/mine  -> recruiter's own posted jobs
router.get("/mine", protect, requireRole("recruiter"), async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/jobs/:id -> single job details
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("recruiter", "name company");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/jobs -> recruiter posts a new job
router.post("/", protect, requireRole("recruiter"), async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, recruiter: req.user._id });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/jobs/:id -> recruiter edits their own job
router.put("/:id", protect, requireRole("recruiter"), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own job posts" });
    }
    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/jobs/:id -> recruiter deletes/closes their own job
router.delete("/:id", protect, requireRole("recruiter"), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own job posts" });
    }
    await job.deleteOne();
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
