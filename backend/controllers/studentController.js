import Student from '../models/Student.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const studentSignup=async(req,res)=>{
    try{
        const {name,email,password,regNo,department,year}=req.body;
        const existingStudent=await Student.findOne({email});
        if(existingStudent) return res.status(400).json({message:"Student already exists"});
        const hashedPassword=await bcrypt.hash(password,10);
        const student=new Student({
            name,
            email,
            password:hashedPassword,
            regNo,
            department,
            year,
        });
        await student.save();
        res.json({message:"Signup successful"});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
};

export const studentLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const student=await Student.findOne({email});
        if(!student) return res.status(400).json({message:"Invalid email or password"});
        const isMatch=await bcrypt.compare(password,student.password);
        if(!isMatch) return res.status(400).json({message:"Invalid email or password"});
        const token=jwt.sign({id:student._id},"secretKey",{expiresIn:"1d"});
        res.json({message:"Login Successful",token});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
};