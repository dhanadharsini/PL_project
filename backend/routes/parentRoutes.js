import express from 'express';
import {parentSignup,parentLogin} from '../controllers/parentController.js';

const router=express.Router();
router.post("/signup",parentSignup);
router.post("/login",parentLogin);

export default router;