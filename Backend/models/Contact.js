const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  name: { type: String, required: true },
  role: { type: String }, // E.g., Manager, Owner, etc.
  email: { type: String, required: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);
