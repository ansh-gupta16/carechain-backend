const express = require('express');
const router = express.Router();
const HelpRequest = require('../models/HelpRequest');

// GET all help requests
router.get('/', async (req, res) => {
  try {
    const requests = await HelpRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests' });
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

module.exports = router;
