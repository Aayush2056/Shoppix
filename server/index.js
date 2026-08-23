import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectdb from "./src/config/db.js"
import authRegister from "./src/routes/authRegister.js"
import cors from "cors"
const app = express()
const PORT = process.env.PORT

app.use(cors())

app.use("/api/auth",authRegister)

app.listen(PORT,async()=>{
    await connectdb()
    console.log(`server is running on ${PORT}`);
}) 