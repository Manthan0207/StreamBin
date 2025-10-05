import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    const token = req.cookies["authToken"];
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized : No token provided" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" })
        }
        req.userId = decode.userId;
        next();
    } catch (error) {
        console.log("Error in VerifyToken Middleware ", error.message);
        return res.status(500).json({ message: false, message: "Server Error" });
    }
}

export default verifyToken;