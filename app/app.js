import express from 'express';
import { config} from 'dotenv';
import mongoose from 'mongoose';
const app = express();

config();
// not recmonded to use in production just for development of assesment
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

connectDB();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const startserver = async (PORT) => {
   try {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is Running on http://localhost:${PORT}`)
    });

   } catch (error) {
       console.error(`Error: ${error.message}`);
       process.exit(1);
    
   }
};
const PORT = process.env.PORT || 3000;

startserver(PORT);