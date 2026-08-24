import express from "express"
import { registerUser , loginUser ,getUser } from "../controllers/authController.js";
import {protect} from "../middlewares/auth.middleware.js"
import { admin } from "../middlewares/admin.middleware.js";
 const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)

router.post("/users",protect,admin,getUser)
export default router