import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import upload from '../utils/configureStorangeEngine.js';
import { uploadFile } from '../controllers/files.controller.js';



const router = express.Router();


// router.post('/upload', upload.single('file'), uploadFile);
router.post('/upload', (req, res, next) => {
    upload.single('file')(req, res, function (err) {
        if (err) {
            console.error("❌ Multer error:", err);
            return res.status(400).json({ success: false, message: err.message });
        }

        console.log("✅ Multer middleware executed");
        console.log("👉 req.file:", req.file);
        console.log("👉 req.body:", req.body);

        next();
    });
}, uploadFile);

export default router;