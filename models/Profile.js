const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  bio: String,
  avatar: String // base64 string or image URL
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
