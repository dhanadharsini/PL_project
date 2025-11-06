import OutpassRequest from "../models/outpassRequest.js";
import Parent from "../models/Parent.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Create transporter globally so it’s accessible in all functions
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // your App Password
  },
});

// ✅ 1. Student sends outpass request
export const sendOutpassRequest = async (req, res) => {
  try {
    const {
      name,
      rollNo,
      roomNo,
      department,
      hostelName,
      fromDate,
      toDate,
      reason,
    } = req.body;

    // Step 1: Find parent using student's roll number
    const parent = await Parent.findOne({ studentRegNo: rollNo.trim() });

    if (!parent) {
      console.log("No parent found for rollNo:", rollNo);
      return res.status(404).json({ message: "No parent found for this student." });
    }

    const parentEmail = parent.email;

    // Step 2: Save outpass request
    const request = new OutpassRequest({
      studentName: name,
      studentEmail: parent.studentEmail || "", // optional: add student's email if stored
      regNo: rollNo,
      roomNo,
      department,
      hostelName,
      fromDate,
      toDate,
      reason,
      parentEmail,
      status: "Pending",
    });

    await request.save();

    // Step 3: Confirmation/Reject links (frontend or backend URLs)
    const confirmUrl = `${process.env.BACKEND_URL}/api/outpass/confirm/${request._id}`;
    const rejectUrl = `${process.env.BACKEND_URL}/api/outpass/reject/${request._id}`;

    // Step 4: Send mail to parent
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: parentEmail,
      subject: "Outpass Request Confirmation",
      html: `
        <h3>Outpass Request from ${name}</h3>
        <p><strong>Reg No:</strong> ${rollNo}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Hostel:</strong> ${hostelName}</p>
        <p><strong>Room No:</strong> ${roomNo}</p>
        <p><strong>From:</strong> ${fromDate}</p>
        <p><strong>To:</strong> ${toDate}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p>Please confirm your ward's outpass request:</p>
        <a href="${confirmUrl}" style="background-color:green;color:white;padding:10px 15px;text-decoration:none;">Confirm</a>
        <a href="${rejectUrl}" style="background-color:red;color:white;padding:10px 15px;margin-left:10px;text-decoration:none;">Reject</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("Mail sent successfully to:", parentEmail);
    res.json({ message: "Request saved and email sent successfully!" });
  } catch (err) {
    console.error("Error sending outpass request:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ 2. Parent confirms request
export const confirmRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await OutpassRequest.findById(id);

    if (!request) return res.status(404).send("Request not found");

    request.status = "Confirmed";
    await request.save();

    // Send mail to student (if studentEmail exists)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: request.studentEmail || "student@example.com", // fallback
      subject: "Outpass Request Approved ✅",
      html: `
        <h3>Hi ${request.studentName},</h3>
        <p>Your parent has <b>confirmed</b> your outpass request.</p>
        <p><b>Status:</b> Confirmed ✅</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.send("<h2>✅ Outpass confirmed successfully! Mail sent to student.</h2>");
  } catch (error) {
    console.error("Confirm error:", error);
    res.status(500).send("Server error");
  }
};

// ❌ 3. Parent rejects request
export const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await OutpassRequest.findById(id);

    if (!request) return res.status(404).send("Request not found");

    request.status = "Rejected";
    await request.save();

    // Send mail to student
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: request.studentEmail || "student@example.com",
      subject: "Outpass Request Rejected ❌",
      html: `
        <h3>Hi ${request.studentName},</h3>
        <p>Your parent has <b>rejected</b> your outpass request.</p>
        <p><b>Status:</b> Rejected ❌</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.send("<h2>❌ Outpass rejected successfully! Mail sent to student.</h2>");
  } catch (error) {
    console.error("Reject error:", error);
    res.status(500).send("Server error");
  }
};
