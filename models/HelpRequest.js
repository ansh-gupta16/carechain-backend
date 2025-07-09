const mongoose = require("mongoose");

const HelpRequestSchema = new mongoose.Schema({
name: { type: String, required: true },
title: { type: String, required: true },
description: { type: String, required: true },
location: { type: String },

status: {
type: String,
enum: ["Open", "Resolved"],
default: "Open"
},
createdAt: {
type: Date,
default: Date.now
}
});

module.exports = mongoose.model("HelpRequest", HelpRequestSchema);