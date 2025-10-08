import File from "../models/File.model.js"
export const uploadFile = async (req, res) => {
    try {
        console.log(req.file);

        const file = new File({
            fileName: req.file.filename,
            owner: req.userId,
            size: req.file.size,
            encoding: "none",
            gridFsId: req.file.id
        });
        await file.save();
        return res.status(201).json({ success: true, message: "File uploaded successfully" })
    } catch (error) {
        console.log("Error in upload File ", error.message);
        return res.status(500).json({ success: false, message: "Upload failed" })
    }
}