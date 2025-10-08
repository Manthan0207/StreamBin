import { GridFsStorage } from "multer-gridfs-storage";
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();
console.log("Connecting GridFS to:", process.env.MONGO_URI);

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => (
        {
            filename: file.originalname,
            bucketName: "upload",// will create uploads.files & uploads.chunks
        }
    )
})

const upload = multer({
    storage, limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

export default upload;