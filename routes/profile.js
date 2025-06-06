const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// GET profile by email
router.get("/:email", async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.params.email });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT profile by email (create or update)
router.put("/:email", async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;
    const email = req.params.email;

    const updated = await Profile.findOneAndUpdate(
      { email },
      { name, email, bio, avatar },
      { upsert: true, new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
