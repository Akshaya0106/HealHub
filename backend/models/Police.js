const mongoose = require("mongoose");

const policeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    badgeNumber: { type: String, required: true, unique: true },
    station: { type: String, required: true },
    experience: { type: Number, required: true },
    contactNumber: { type: String, required: true },
    rating: { type: Number, default: 0 }
});

module.exports = mongoose.model("Police", policeSchema);
