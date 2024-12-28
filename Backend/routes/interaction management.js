const express = require('express');
const mongoose = require('mongoose');
const Interaction = require('./models/interaction'); // Adjust path as needed
const Lead = require('./models/lead'); // Adjust path as needed

const router = express.Router();

// Record an interaction (call or order)
router.post('/interactions', async (req, res) => {
  try {
    const { leadId, type, details } = req.body;

    // Validate required fields
    if (!leadId || !type) {
      return res.status(400).json({ error: 'Lead ID and type are required' });
    }

    // Create the interaction
    const interaction = new Interaction({
      lead: leadId,
      type,
      details,
    });

    const savedInteraction = await interaction.save();

    // Update last call date if type is "call"
    if (type === 'call') {
      await Lead.findByIdAndUpdate(leadId, { lastCallDate: Date.now() });
    }

    res.status(201).json({ message: 'Interaction recorded successfully', interaction: savedInteraction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to record interaction' });
  }
});

// Get all interactions for a specific lead
router.get('/interactions/lead/:leadId', async (req, res) => {
  try {
    const { leadId } = req.params;

    const interactions = await Interaction.find({ lead: leadId });

    res.status(200).json(interactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch interactions' });
  }
});

module.exports = router;
