const mongoose = require('mongoose');

const ClubRegistrationSchema = new mongoose.Schema({
  clubName: {
    type: String,
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
  yearDepartment: {
    type: String,
    required: true,
  },
  whyJoin: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending', // Pending, Approved, Rejected
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ClubRegistration', ClubRegistrationSchema);
