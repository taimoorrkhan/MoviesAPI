import express from 'express';
import { configDotenv } from 'dotenv';
const app = express();

configDotenv();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});