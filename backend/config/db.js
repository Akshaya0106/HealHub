const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://aravind6788:48G2CMcbcMItL8im@healhub.yvden.mongodb.net/?retryWrites=true&w=majority&appName=healHub', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1); // Stop the server if DB connection fails
    }
};

connectDB();

module.exports = mongoose;
