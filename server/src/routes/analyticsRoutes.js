import express from "express"
import { protect } from "../middlewares/auth.middleware.js"
import {admin} from "../middlewares/admin.middleware.js"
import { adminStats } from "../controllers/analyticsController.js"
const router = express.Router()

router.get("/",protect,admin,adminStats)
export default router