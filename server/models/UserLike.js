// Import Mongoose
const mongoose = require('mongoose');

// Define Schema
const Schema = mongoose.Schema;

// Create UserLike Schema
const UserLikeSchema = new Schema({
  liker: {
    type: String
  },
  liked: {
    type: String
  }
});

// Create and export UserLike model
module.exports = mongoose.model('UserLike', UserLikeSchema);
