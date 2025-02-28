import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) =>{
    try {
       const token = req.cookies.token;
       if(!token){
        return res.status(401).json({message: "Unauthorized, no token"})
       }
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       req.user = await User.findById(decoded.userId).select('-password')
       if(!req.user){
        return res.status(401).json({message: "Uer not found"})
       }
       next();
    } catch (error) {
        res.status(401).json({message: "Invalid token", error})
        console.log("Invalid Token", token)
    }
}