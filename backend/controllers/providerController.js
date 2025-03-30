const User = require('../models/User');
const Psychiatrist = require("../models/Psychiatrist"); // Add this line

const Police = require('../models/Police');
const Lawyer = require('../models/Lawyer');
const Doctor = require('../models/Doctor');

exports.getProviders = async (req, res) => {
    try {
        const providers = await User.find({ role: 'provider' });
        res.json(providers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch providers' });
    }
};

exports.getProviderById = async (req, res) => {
    try {
        const provider = await User.findById(req.params.id).select('-password');
        if (!provider || provider.role !== "provider") {
            return res.status(404).json({ error: "Provider not found" });
        }

        let additionalDetails = null;

        // Fetch additional details based on serviceType
        switch (provider.serviceType) {
            case "SafeGuard":
                additionalDetails = await Police.findOne({ userId: provider._id }).lean();
                break;
            case "LawHelp":
                additionalDetails = await Lawyer.findOne({ userId: provider._id }).lean();
                break;
            case "MediCare":
                additionalDetails = await Doctor.findOne({ userId: provider._id }).lean();
                break;
            case "MindCare":
                additionalDetails = await Psychiatrist.findOne({ userId: provider._id }).lean();
                break;
        }

        res.json({ ...provider.toObject(), additionalDetails });

    } catch (error) {
        console.error("Error fetching provider details:", error);
        res.status(500).json({ error: "Server error while fetching provider details" });
    }
};
