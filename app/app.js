import express from 'express';
import { config} from 'dotenv';
import mongoose from 'mongoose';
const app = express();

config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
           
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