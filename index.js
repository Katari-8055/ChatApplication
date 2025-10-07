import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectMongoDB from './config/DB.js';
import router from './routes/userRoutes.js';
import router2 from './routes/chatRoutes.js';
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";

// import chats from './data/data.js';


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 3000;

connectMongoDB();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/get-upload-url", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = "profile_pics";

  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${process.env.CLOUD_API_SECRET}`;
  const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

  res.json({
    url: `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
    api_key: process.env.CLOUD_API_KEY,
    timestamp,
    folder,
    signature,
  });
});


app.use('/api/auth', router);
app.use('/api/chat', router2);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})