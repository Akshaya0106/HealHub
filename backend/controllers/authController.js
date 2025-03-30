const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Police = require('../models/Police');
const Lawyer = require('../models/Lawyer');
const Doctor = require('../models/Doctor');
const Psychiatrist = require('../models/Psychiatrist');
const { request } = require('express');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, serviceType, details } = req.body;

        console.log(req.body);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword, role });

        // If role is 'provider', serviceType is required
        if (role === "provider") {
            if (!serviceType) {
                return res.status(400).json({ error: "Service type is required for providers" });
            }
            newUser.serviceType = serviceType;
        }

        await newUser.save();

        // If service provider, create an entry in the relevant collection
        if (role === "provider" && details) {
            switch (serviceType) {
                case "SafeGuard":
                    if (!details.badgeNumber || !details.contactNumber || !details.experience || !details.station) {
                        return res.status(400).json({ error: "Missing required police details" });
                    }
                    
                    const existingBadge = await Police.findOne({ badgeNumber: details.badgeNumber });
                    if (existingBadge) return res.status(400).json({ error: "Badge number already in use" });

                    await Police.create({ userId: newUser._id, ...details });
                    break;

                case "LawHelp":
                    if (!details.barLicenseNumber) {
                        return res.status(400).json({ error: "Bar license number is required" });
                    }

                    const existingLawyer = await Lawyer.findOne({ barLicenseNumber: details.barLicenseNumber });
                    if (existingLawyer) return res.status(400).json({ error: "Bar license number already in use" });

                    await Lawyer.create({ userId: newUser._id, ...details });
                    break;

                case "MediCare":
                    if (!details.medicalLicenseNumber) {
                        return res.status(400).json({ error: "Medical license number is required" });
                    }

                    const existingDoctor = await Doctor.findOne({ medicalLicenseNumber: details.medicalLicenseNumber });
                    if (existingDoctor) return res.status(400).json({ error: "Medical license number already in use" });

                    await Doctor.create({ userId: newUser._id, ...details });
                    break;

                case "MindCare":
                    if (!details.licenseNumber) {
                        return res.status(400).json({ error: "License number is required" });
                    }

                    const existingPsychiatrist = await Psychiatrist.findOne({ licenseNumber: details.licenseNumber });
                    if (existingPsychiatrist) return res.status(400).json({ error: "License number already in use" });

                    await Psychiatrist.create({ userId: newUser._id, ...details });
                    break;

                default:
                    return res.status(400).json({ error: "Invalid service type" });
            }
        }

        res.status(201).json({ message: "User registered successfully", userId: newUser._id });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Registration failed", details: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate JWT with extended expiration
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '6h' } // Increased token validity
        );

        res.json({ token, user });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
};
