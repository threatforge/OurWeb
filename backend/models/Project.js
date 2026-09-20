const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  technologies: [{ type: String }],
  image: { type: String },
  github: { type: String },
  demo: { type: String },
  status: {
    type: String,
    enum: ['ACTIVE', 'COMPLETED', 'IN DEVELOPMENT'],
    default: 'IN DEVELOPMENT'
  },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
