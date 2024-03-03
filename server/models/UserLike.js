// Import Mongoose
const mongoose = require('mongoose');

// Define Schema
const Schema = mongoose.Schema;

// Create UserLike Schema
const UserLikeSchema = new Schema({
  liker: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assuming you have one)
    required: true
  },
  liked: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assuming you have one)
    required: true
  }
});

// Create and export UserLike model
module.exports = mongoose.model('UserLike', UserLikeSchema);
