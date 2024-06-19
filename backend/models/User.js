const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: false },
  password: { type: String, required: true },
  role: { type: String, enum: ['manager', 'employee'], required: true },
});

module.exports = mongoose.model('User', UserSchema);
