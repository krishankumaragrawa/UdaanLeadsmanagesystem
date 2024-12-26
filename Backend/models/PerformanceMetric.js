const mongoose = require('mongoose');

const performanceMetricSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  ordersCount: { type: Number, default: 0 },
  lastOrderDate: { type: Date },
  frequency: { type: Number, default: 0 }, // E.g., number of orders in the last 30 days
  isUnderperforming: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PerformanceMetric', performanceMetricSchema);
