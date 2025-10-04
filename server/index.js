import express from 'express';
import dotenv from 'dotenv'
import { ConnectDB } from './db/connectDB.js';

dotenv.config();
const app = express();

app.listen(3000, async () => {
    await ConnectDB();
    console.log("Server running on port 3000");
});