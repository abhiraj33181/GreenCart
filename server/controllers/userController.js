import bcrypt from 'bcryptjs'

// Register User : /api/user/register

import userModel from "../models/User.js";
import JWT from 'jsonwebtoken';

export const register = async (req,res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.json({success : false, message : "Missing Details"})
        }

        const existingUser = await userModel.findOne({email});

        if (existingUser) {
            return res.json({success : false, message : "User Already Exist"})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            name,
            email,
            password : hashPassword
        })

        const token = JWT.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.cookie('token', token, {
            httpOnly : true,  //Prevent Javascript to access cokkie
            secure : process.env.NODE_ENV === 'production', // use secure cookie in production
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000 // cookie expiration time
        })

        return res.json({success : true, user : {email : user.email, name : user.name}})
    } catch (error) {
        console.error(error.message);
        res.json({success : false, message : error.message})
    }
}

// login user : /api/user/login

export const login = async (req,res) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.json({success : false, message : "Email and Password is required"})
        }
        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success : false, message : "Invalid Credentials!!"})
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if (!isMatch) {
            return res.json({success : false, message : "Invalid Credentials!!"})
        }

        const token = JWT.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.cookie('token', token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        return res.json({success : true, user : {email : user.email, name : user.name}})

    } catch (error) {
        console.error(error.message);
        res.json({success : false, message : error.message})
    }
}

// Check Auth :  /api/user/is-auth

export const isAuth = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId).select("-password")

        return res.json({success : true, user})
    } catch (error) {
        console.error(error.message);
        res.json({success : false, message : error.message})
    }
}

// logout user : /api/user/logout

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : "strict"
        })

        return res.json({success : true, message : "User Logged Out"})
    } catch (error) {
        console.error(error.message);
        res.json({success : false, message : error.message})
    }
}