
const mongoose = require('mongoose');

const mongoUri = "mongodb+srv://admin:admintmr@moviesdatabase.u942l.mongodb.net/?retryWrites=true&w=majority&appName=MoviesDatabase"
const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri || process.env.MONGO_URI, {
           
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;