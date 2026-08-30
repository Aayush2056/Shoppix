import User from "../model/userSchema.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.js";

const gentoken =(id)=>{
      return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'})
}

const registerUser = async(req,res)=>{
          const {name , email , password,role} = req.body
          try {
            const existUser = await User.findOne({email})
            if(existUser){
            return res.status(400).json({message : "user already exist"})    
            }
            const hashPassword = await bcrypt.hash(password,10);
           const newUser=  await User.create({name , email , password:hashPassword,role})
        //    res.status(200).json({message : "user created",newUser}) 
            if(newUser){
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                newUser.otp = otp;
                await newUser.save();
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
        
       
          } catch (error) {
            res.status(400).json({message : "something error", error}) 
          }
}

const loginUser =  async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
                token : gentoken(user._id)
            })
        }
        else  res.status(400).json({message : "invaliddetails"})
    } catch (error) {
        res.status(400).json({message : "invalid email or password"})
    }
}

const getUser = async(req,res)=>{
    try {
      const user = await User.find().select("-password");
      res.json({
       user
      })
    } catch (error) {
        res.status(500).json({message: "server-error"})
    }
}
 const confirmOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        user.verified = true;
        user.otp = undefined;

        await user.save();

        return res.status(200).json({
            message: "Account verified successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: gentoken(user._id)
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
export {registerUser ,loginUser,getUser,confirmOtp}