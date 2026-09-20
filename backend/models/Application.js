const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  university: { type: String, required: true },
  semester: { type: String, required: true },
  discord: { type: String, required: true },
  preferredRole: { type: String, required: true },
  skills: { type: String, required: true },
  github: { type: String },
  linkedin: { type: String },
  portfolio: { type: String },
  experience: { type: String, required: true },
  motivation: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'accepted', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
