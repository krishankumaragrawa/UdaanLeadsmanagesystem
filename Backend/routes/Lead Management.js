const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant'); // Replace with your correct model path
const Lead = require('./models/lead'); // Replace with your correct model path

const router = express.Router();

// Add a new restaurant lead
router.post('/leads', async (req, res) => {
  try {
    const { name, address, status, callFrequency, createdBy } = req.body;

    // Validate required fields
    if (!name || !address || !createdBy) {
      return res.status(400).json({ error: 'Name, address, and createdBy are required' });
    }

    // Create a new restaurant
    const restaurant = new Restaurant({ name, address });
    const savedRestaurant = await restaurant.save();

    // Create a new lead for the restaurant
    const lead = new Lead({
      restaurant: savedRestaurant._id,
      status: status || 'new',
      callFrequency: callFrequency || 7, // Default to weekly calls
      createdBy,
    });

    const savedLead = await lead.save();

    res.status(201).json({ message: 'Lead created successfully', lead: savedLead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

// Get all leads with basic restaurant information
router.get('/leads', async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate('restaurant', 'name address') // Populate restaurant details
      .populate('createdBy', 'name email'); // Populate user details if needed

    res.status(200).json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Get a specific lead by ID
router.get('/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id)
      .populate('restaurant', 'name address')
      .populate('createdBy', 'name email');

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.status(200).json(lead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch lead' });
  }
});

// Update lead status
router.put('/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, callFrequency } = req.body;

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    if (status) lead.status = status;
    if (callFrequency) lead.callFrequency = callFrequency;

    lead.updatedAt = Date.now();

    const updatedLead = await lead.save();

    res.status(200).json({ message: 'Lead updated successfully', lead: updatedLead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// Delete a lead
router.delete('/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

module.exports = router;
