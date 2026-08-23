import User from "../model/userSchema.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.js";

const gentoken =(id)=>{
      return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'})
}

const registerUser = async(req,res)=>{
          const {name , email , password} = req.body
          try {
            const existUser = User.findOne({email})
            if(existUser){
            return res.status(400).json({message : "user already exist"})    
            
            const hashPassword = bcrypt.hash(password,10);
           const newUser= User.create({name , email , password:hashPassword})
            res.status(200).json({message : "user created"}) 
            if(newUser){
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                const message = `welcome to the shoppix ${name}  enjoy your shopping , OTP-${otp} `
                await sendEmail(email,`your otp for registeration`,message)
               return res.status(200).json({
                 _id : newUser._id,
                name : newUser.name,
                email : newUser.email,
                role : newUser.role,
                token : gentoken(newUser._id),
               })
            }
        }
       
          } catch (error) {
            res.status(400).json({message : "something error", error}) 
          }
}

const loginUser =  async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = User.findOne({email})
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
                toke : gentoken(user._id)
            })
        }
        else  res.status(400).json({message : "invalid email or password"})
    } catch (error) {
        res.status(400).json({message : "invalid email or password"})
    }
}

const getUser = async(req,res)=>{
    try {
      const user = await User.find().select("-password");
      res.json({
        _id : user._id,
        name : user.name,
        email : user.email,
        role : user.role
      })
    } catch (error) {
        res.status(500).json({message: "server-error"})
    }
}
export {registerUser ,loginUser,getUser}