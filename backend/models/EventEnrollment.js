const mongoose = require('mongoose');

const EventEnrollmentSchema = new mongoose.Schema({
  event: {
    type: String,  // Could also be ObjectId ref to an Event model if you prefer strict mapping
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('EventEnrollment', EventEnrollmentSchema);
