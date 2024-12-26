// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const dbConfig = require("./config/dbConfig");
const cors = require('cors');
const bodyParser = require('body-parser');
const Lead = require('./models/Lead');
// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
// API to add a new lead
app.post('/api/leads', async (req, res) => {
    try {
      const { name, address, leadStatus, createdBy } = req.body;
  
      // Validate required fields
      if (!name || !createdBy) {
        return res.status(400).json({ message: 'Name and createdBy are required.' });
      }
  
      const lead = new Lead({
        name,
        address,
        leadStatus,
        createdBy,
      });
  
      const savedLead = await lead.save();
      res.status(201).json({ message: 'Lead created successfully', lead: savedLead });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating the lead.' });
    }
  });




// Health Check Route
app.get('/', (req, res) => {
    res.send('Lead Management System Backend is Running...');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // Exit with failure
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1); // Exit with failure
});