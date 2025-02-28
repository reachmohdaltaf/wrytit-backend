import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const SignUpUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body;

        //check if the user already exists or not
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "User Already Exists"})
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        //creating the user
        const user = new User({name, email, password:hashPassword})
        await user.save()

        res.status(201).json({message: "User Signed in Successfully", user: user})
    } catch (error) {
        res.status(500).json({message: "User Signup Failed", details: error})
        console.log(error)
    }
}

export const LoginUser = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        //checking: did user exists
        if(!user){
             return res.status(400).json({message: "user does not exists"})  
        }
        //chechking: password matches
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"})
        }

        //generate JWT token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        })
        //login successfull
        res.status(201).json({
            message: "Login Successful",
            token,
            id: user._id,
            name: user.name,
            email: user.email
        })
    } catch (error) {
        res.status(500).json({message: "Login Failed",details: error.message})
        console.log("error", error)
    }
}

export const LogoutUser = async (req, res)=>{
    res.clearCookie('token')
    res.status(200).json({message: "Logout Successful"})
}

export const getUserProfile = async (req, res)=>{
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message: "Error fetching user profile", details: error.message})
        console.log("error", error)
    }
}