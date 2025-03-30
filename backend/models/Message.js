const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }], // Corrected array syntax
  messages: [
    {
      text: { type: String, required: true },
      time: { type: Date, default: Date.now },
      seen: { type: Boolean, default: false },
      sent: { type: Boolean, default: true },
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);
