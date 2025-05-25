const mongoose = require('mongoose');

const HelpRequestSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HelpRequest', HelpRequestSchema);
