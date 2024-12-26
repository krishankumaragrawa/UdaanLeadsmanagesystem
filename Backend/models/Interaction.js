const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['call', 'order'], required: true }, // 'call' or 'order'
  details: { type: String }, // Additional details about the interaction
  interactionDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interaction', interactionSchema);
