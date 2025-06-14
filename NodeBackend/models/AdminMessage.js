// models/AdminMessage.js
const mongoose = require('mongoose');

const AdminMessageSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    roles: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: 'At least one role must be specified',
      },
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // optional: who sent this message (admin)
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model('AdminMessage', AdminMessageSchema);
