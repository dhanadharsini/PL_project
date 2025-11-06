import Warden from '../models/Warden.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const wardenSignup=async(req,res)=>{
    try{
        const {name,email,phone,password,wardenId,hostelName}=req.body;
        const existingWarden=await Warden.findOne({email});
        if(existingWarden) return res.status(400).json({message:"Warden already exists"});
        const hashedPassword=await bcrypt.hash(password,10);
        const warden=new Warden({
            name,
            email,
            phone,
            password:hashedPassword,
            wardenId,
            hostelName,
        });
        await warden.save();
        res.json({message:"Signup successful"});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
};

export const wardenLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const warden=await Warden.findOne({email});
        if(!warden) return res.status(400).json({message:"Invalid email or password"});
        const isMatch=await bcrypt.compare(password,warden.password);
        if(!isMatch) return res.status(400).json({message:"Invalid email or password"});
        const token=jwt.sign({id:warden._id},"secretKey",{expiresIn:"1d"});
        res.json({message:"Login Successful",token});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
};