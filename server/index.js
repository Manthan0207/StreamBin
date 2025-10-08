import express from 'express';
import dotenv from 'dotenv'
import { ConnectDB } from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import filesRouter from './routes/files.route.js';
import cors from 'cors'
dotenv.config();


const app = express();


app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true //cookies will be parsed with every requests
    }
))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/files', filesRouter);



app.listen(3000, async () => {
    await ConnectDB();
    console.log("Server running on port 3000");
});