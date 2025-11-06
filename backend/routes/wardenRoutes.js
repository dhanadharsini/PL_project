import express from 'express';
import {wardenSignup,wardenLogin} from '../controllers/wardenController.js';

const router=express.Router();
router.post("/signup",wardenSignup);
router.post("/login",wardenLogin);

export default router;