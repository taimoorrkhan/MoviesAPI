const express = require('express');
const { config } = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const app = express();

config();
// not recmonded to use in production just for development of assesment
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

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