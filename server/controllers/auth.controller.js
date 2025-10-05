import mongoose from "mongoose";
import { User } from "../models/User.model.js";
import bcryptjs from 'bcryptjs'
import verifyToken from "../middlewares/verifyToken.js";
import GenerateAndSetToken from "../utils/generateTokenAndSetCookies.js";



export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ success: false, message: "User Already Exists" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            username,
        })
        await user.save();
        GenerateAndSetToken(res, user._id);

        res.status(201).json({
            success: true,
            message: "User Created",
            user: {
                ...user._doc,
                password: null
            }
        })
    } catch (error) {
        console.log("Error in signup " + error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "User Doesn't exist" })
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log(password, user.password)
            return res.status(401).json({ success: false, message: "Credentials are wrong" })
        }

        user.lastLogin = new Date();
        await user.save();
        GenerateAndSetToken(res, user._id);


        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error in Login", error);
        res.status(500).json({ success: false, message: error.message })
    }
}


export const checkAuth = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");

        if (!user) return res.status(401).json({ success: false, message: "User not found" })

        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log("Error in checkAuth ", error.message);
        return res.status(500).json({ success: false, message: "Internal Server error" })
    }
}