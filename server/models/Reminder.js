const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
	title: { type: String, required: true },
	reminderDate: { type: Date, default: Date.now, required: true },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Reminder', reminderSchema);