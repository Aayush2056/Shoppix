import express from "express"
import {protect} from "../middlewares/auth.middleware.js"
import { admin } from "../middlewares/admin.middleware.js";
const upload = multer({
  dest: "uploads/"
});
 const router = express.Router();

 router.route("/").get(getProducts).post(protect,admin, upload.single('image'), createProduct)
 router.route("/:id").get(getProductsById).put(protect,admin,upload.single('image'),updateProduct).delete(protect,admin,deleteProduct)