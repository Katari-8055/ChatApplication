import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectMongoDB from './config/DB.js';
import router from './routes/authRoutes.js';

// import chats from './data/data.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectMongoDB();

app.use(cors());
app.use(express.json());


app.use('/api/auth', router);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})