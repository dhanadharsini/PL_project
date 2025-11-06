import express from "express";
import {
  sendOutpassRequest,
  confirmRequest,
  rejectRequest,
} from "../controllers/outpassController.js";

const router = express.Router();

router.post("/send", sendOutpassRequest);
router.get("/confirm/:id", confirmRequest);
router.get("/reject/:id", rejectRequest);

export default router;
