const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  }
});

module.exports = reactionSchema;