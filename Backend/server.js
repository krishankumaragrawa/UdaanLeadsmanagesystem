// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const dbConfig = require("./config/dbConfig");
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies





// Health Check Route
app.get('/', (req, res) => {
    res.send('Lead Management System Backend is Running...');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
