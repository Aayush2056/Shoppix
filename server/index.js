import express, { urlencoded } from "express"
import dotenv from "dotenv"
dotenv.config()
import connectdb from "./src/config/db.js"
import authRegister from "./src/routes/authRegister.js"
import productRoutes from "./src/routes/productRoutes.js"
import orderRoutes from "./src/routes/orderRoutes.js"
import paymentRoutes from "./src/routes/paymentRoutes.js"
import analyticsRoutes from "./src/routes/analyticsRoutes.js"
import cors from "cors"
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/api/auth",authRegister)
app.use("/api/products",productRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/payment",paymentRoutes)
app.use("/api/analytics",analyticsRoutes)

app.listen(PORT,async()=>{
    await connectdb()
    console.log(`server is running on ${PORT}`);
}) 