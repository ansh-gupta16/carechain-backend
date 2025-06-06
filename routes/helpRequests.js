const express = require('express');
const router = express.Router();
const HelpRequest = require('../models/HelpRequest');

// GET all help requests
router.get("/", async (req, res) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Auto-update old requests to "Resolved"
    await HelpRequest.updateMany(
      { createdAt: { $lt: sevenDaysAgo }, status: { $ne: "Resolved" } },
      { $set: { status: "Resolved" } }
    );

    const requests = await HelpRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch help requests" });
  }
});

// POST a new help request
router.post('/', async (req, res) => {
  const { name, title, description } = req.body;

  try {
    const newRequest = new HelpRequest({ name, title, description });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save request' });
  }
});

// DELETE a help request by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await HelpRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete request" });
  }
});

// PUT to update status or other fields
router.put("/:id", async (req, res) => {
  try {
    const updated = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error("PUT error:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;
