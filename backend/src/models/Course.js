
const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String]
},{ timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
