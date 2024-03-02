// Import necessary modules
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

// Middleware function for authorization
const authorize = (req, res, next) => {
    const token = req.headers.authorization
    if (token && process.env.SECRET){
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
          res.status(403).json({error: "Token verification failed. :("})
        } else {
          next()
        }
      })
    }
};

module.exports = router