import express from "express"
import { registerUser , loginUser ,getUser } from "../controllers/authController.js";
const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)

router.post("/users",getUser)
export default router