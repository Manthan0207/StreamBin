import { Timestamp } from "bson";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        files: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "File",
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        lastLogin: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);


export const User = mongoose.model('users', UserSchema);