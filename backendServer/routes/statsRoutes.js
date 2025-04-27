// Import the Express library
const express = require('express');
// Create a new router instance
const router = express.Router();
// Import stats controller
const { findStats, getSubscriptionStats } = require("../controller/statsController");

// Define the routes
router.get("/stats/getStats", findStats);
router.get("/stats/findSubscriptionStats", getSubscriptionStats);

module.exports = router;
