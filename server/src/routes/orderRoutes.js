import express from "express"
import { protect } from "../middlewares/auth.middleware.js"
import {admin} from "../middlewares/admin.middleware.js"
import { createOrder, getOrders, myOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect,createOrder).get(protect,getOrders)
router.route("myOrders").get(protect,myOrders)
router.route("/:id/status").put(protect,admin,updateOrderStatus)

export default router