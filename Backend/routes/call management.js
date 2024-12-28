const express = require('express');
const Lead = require('./models/lead'); // Adjust path as needed

const router = express.Router();

// Get leads requiring calls today
router.get('/call-planning/today', async (req, res) => {
  try {
    const today = new Date();
    const leads = await Lead.find({
      $or: [
        { lastCallDate: { $exists: false } }, // No calls made yet
        {
          lastCallDate: {
            $lte: new Date(today.setDate(today.getDate() - 7)), // Calls due based on frequency
          },
        },
      ],
    });

    res.status(200).json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch call-planning leads' });
  }
});

module.exports = router;
