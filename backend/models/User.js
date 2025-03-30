const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['victim', 'provider'], required: true },
    serviceType: { 
        type: String, 
        enum: ['SafeGuard', 'LawHelp', 'MediCare', 'MindCare'], 
        required: function() { return this.role === 'provider'; }
    },
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', userSchema);
