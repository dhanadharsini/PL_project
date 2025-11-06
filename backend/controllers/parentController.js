import Parent from '../models/Parent.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const parentSignup=async(req,res)=>{
    try{
        const {name,email,phone,password,relationship,address,studentRegNo}=req.body;
        const existingParent=await Parent.findOne({email});
        if(existingParent) return res.status(400).json({message:"Parent already exists"});
        const hashedPassword=await bcrypt.hash(password,10);
        const parent=new Parent({
            name,
            email,
            phone,
            password:hashedPassword,
            relationship,
            address,
            studentRegNo,
        });
        await parent.save();
        res.json({message:"Signup successful"});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
};

export const parentLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const parent=await Parent.findOne({email});
        if(!parent) return res.status(400).json({message:"Invalid email or password"});
        const isMatch=await bcrypt.compare(password,parent.password);
        if(!isMatch) return res.status(400).json({message:"Invalid email or password"});
        const token=jwt.sign({id:parent._id},"secretKey",{expiresIn:"1d"});
        res.json({message:"Login Successful",token});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
};