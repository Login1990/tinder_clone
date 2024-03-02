// Import necessary modules
const express = require('express');
const router = express.Router();

// Middleware function for authorization
const authorize = (req, res, next) => {
    // Check if user is authorized
    if (req.headers.authorization === 'mySecretToken') {
        // If authorized, proceed to the next middleware
        next();
    } else {
        // If not authorized, send 403 Forbidden status
        res.sendStatus(403);
    }
};

module.exports = router