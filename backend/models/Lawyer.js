const mongoose = require("mongoose");

const lawyerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    barLicenseNumber: { type: String, required: true, unique: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    contactNumber: { type: String, required: true },
    rating: { type: Number, default: 5.0 }
});

module.exports = mongoose.model("Lawyer", lawyerSchema);
