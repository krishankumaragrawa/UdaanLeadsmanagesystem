const express = require('express');
const mongoose = require('mongoose');
const Contact = require('./models/contact'); // Replace with the correct path to your Contact model
const Restaurant = require('./models/restaurant'); // Replace with the correct path to your Restaurant model

const router = express.Router();

// Add a new contact for a restaurant
router.post('/contacts', async (req, res) => {
  try {
    const { restaurantId, name, role, phone, email } = req.body;

    // Validate required fields
    if (!restaurantId || !name || !phone) {
      return res.status(400).json({ error: 'Restaurant ID, name, and phone are required' });
    }

    // Verify that the restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Create a new contact
    const contact = new Contact({
      restaurant: restaurantId,
      name,
      role,
      phone,
      email,
    });

    const savedContact = await contact.save();

    res.status(201).json({ message: 'Contact added successfully', contact: savedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add contact' });
  }
});

// Get all contacts for a specific restaurant
router.get('/contacts/restaurant/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const contacts = await Contact.find({ restaurant: restaurantId });

    if (contacts.length === 0) {
      return res.status(404).json({ error: 'No contacts found for this restaurant' });
    }

    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Get a specific contact by ID
router.get('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

// Update a contact's details
router.put('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, phone, email } = req.body;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Update contact details
    if (name) contact.name = name;
    if (role) contact.role = role;
    if (phone) contact.phone = phone;
    if (email) contact.email = email;

    const updatedContact = await contact.save();

    res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Delete a contact
router.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = router;
