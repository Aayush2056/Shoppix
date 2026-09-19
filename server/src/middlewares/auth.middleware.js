import jwt from "jsonwebtoken"
import User from "../model/userSchema.js"

const protect = async(req,res,next)=>{
      let token;
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log("DECODE:", decode);
            req.User = await User.findById(decode.id).select("-password")
            console.log("USER:", req.User);
            next()
        } catch (error) {
            res.status(401).json({message : "something went wrong"})
        }
      }
      if(!token){
        res.status(401).json({message : "Not authorized no token"})
      }
}

export {protect}