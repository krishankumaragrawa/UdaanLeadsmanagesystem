const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisineType: { type: String },
  location: { type: String }, // e.g., city or area
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);