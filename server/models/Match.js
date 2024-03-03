// Import Mongoose
const mongoose = require('mongoose');

// Define Schema
const Schema = mongoose.Schema;

// Create UserLike Schema
const MatchSchema = new Schema({
  user1: {
    type: String
  },
  user2: {
    type: String
  }
});

// Create and export UserLike model
module.exports = mongoose.model('Match', MatchSchema);