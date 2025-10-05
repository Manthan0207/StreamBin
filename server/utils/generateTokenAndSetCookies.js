import jwt from 'jsonwebtoken'

const GenerateAndSetToken = async (res, id) => {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.cookie("authToken", token,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    )
    return token;
}
export default GenerateAndSetToken;