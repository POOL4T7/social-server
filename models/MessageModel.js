const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    senderId: { type: String, ref: 'User' },
    receiverId: { type: String, ref: 'User' },
    text: { type: String, trim: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Message', messageSchema);
