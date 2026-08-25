import express from "express"
import {protect} from "../middlewares/auth.middleware.js"
import { admin } from "../middlewares/admin.middleware.js";
import multer from "multer";
import {getProducts ,createProduct ,getProductsById ,updateProduct ,deleteProduct} from "../controllers/productController.js"
const upload = multer({
  dest: "uploads/"
});
 const router = express.Router();

 router.route("/").get(getProducts).post(protect,admin, upload.single('image'), createProduct)
 router.route("/:id").get(getProductsById).put(protect,admin,upload.single('image'),updateProduct).delete(protect,admin,deleteProduct)
 export default router