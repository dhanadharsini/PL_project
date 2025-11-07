import Student from "../models/Student.js";
import Parent from "../models/Parent.js";
import Warden from "../models/Warden.js";
import dotenv from "dotenv";
dotenv.config();

// ✅ Admin login controller
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hardcoded admin credentials (you can change these)
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add Student
export const addStudent = async (req, res) => {
  try {
    const {
      name,
      registerNumber,
      department,
      year,
      hostel,
      roomNumber,
      email,
      password,
      parentName,
    } = req.body;

    // Validation check
    if (
      !name ||
      !registerNumber ||
      !department ||
      !year ||
      !hostel ||
      !roomNumber ||
      !email ||
      !password ||
      !parentName
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newStudent = new Student({
      name,
      registerNumber,
      department,
      year,
      hostel,
      roomNumber,
      email,
      password,
      parentName,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Error adding student" });
  }
};

// Add Parent
export const addParent = async (req, res) => {
  try {
    const { name, email, phone, password, studentRegNo } = req.body;

    // Validation
    if (!name || !email || !phone || !password || !studentRegNo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newParent = new Parent({
      name,
      email,
      phone,
      password,
      studentRegNo,
    });

    await newParent.save();
    res.status(201).json({ message: "Parent added successfully" });
  } catch (error) {
    console.error("Error adding parent:", error);
    res.status(500).json({ message: "Error adding parent" });
  }
};


// Add Warden
export const addWarden = async (req, res) => {
  try {
    const { name, email, phone, password, wardenId, hostel } = req.body;

    if (!name || !email || !phone || !password || !wardenId || !hostel) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newWarden = new Warden({
      name,
      email,
      phone,
      password,
      wardenId,
      hostel,
    });

    await newWarden.save();
    res.status(201).json({ message: "Warden added successfully" });

  } catch (error) {
    console.error("Error adding warden:", error);
    res.status(500).json({ message: "Error adding warden" });
  }
};
