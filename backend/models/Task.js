const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['Sprint', 'Task', 'Bin'], required: true },
  employee: { type: String, required: true },
  completed: { type: Boolean, default: false },
  comments: { type: [String], default: [] },
});

module.exports = mongoose.model('Task', TaskSchema);
