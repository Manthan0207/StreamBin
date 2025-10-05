import mongoose from "mongoose";

const fileSchema = mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        encoding: {
            type: String,  //huffman , zlib etc
            required: true
        },
        gridFsId: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
    { timestamps: true }
)

const File = mongoose.model("File", fileSchema);

export default File;