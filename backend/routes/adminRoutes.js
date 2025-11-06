import express from "express";
import {
  adminLogin,
  addStudent,
  addParent,
  addWarden,
} from "../controllers/adminController.js";

const router = express.Router();

// ✅ Admin login route
router.post("/login", adminLogin);

// ✅ Admin add routes
router.post("/add-student", addStudent);
router.post("/add-parent", addParent);
router.post("/add-warden", addWarden);

export default router;
