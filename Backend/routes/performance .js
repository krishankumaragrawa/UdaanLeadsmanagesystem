const express = require('express');
const PerformanceMetric = require('./models/performanceMetric'); // Adjust path as needed

const router = express.Router();

// Get well-performing accounts
router.get('/performance/well-performing', async (req, res) => {
  try {
    const metrics = await PerformanceMetric.find({
      totalOrders: { $gte: 10 }, // Example threshold for well-performing accounts
    });

    res.status(200).json(metrics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch well-performing accounts' });
  }
});

// Get underperforming accounts
router.get('/performance/underperforming', async (req, res) => {
  try {
    const metrics = await PerformanceMetric.find({
      totalOrders: { $lt: 5 }, // Example threshold for underperforming accounts
    });

    res.status(200).json(metrics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch underperforming accounts' });
  }
});

// Monitor ordering patterns for a restaurant
router.get('/performance/restaurant/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const metric = await PerformanceMetric.findOne({ restaurant: restaurantId });

    if (!metric) {
      return res.status(404).json({ error: 'No performance data found for this restaurant' });
    }

    res.status(200).json(metric);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch performance data' });
  }
});

module.exports = router;
