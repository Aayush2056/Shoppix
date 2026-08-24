
const admin =(req,res,next)=>{
     
    if(req.User && req.User.role ==="admin"){
        next();
    }
    else{
        res.status(500).json({message : "access denied"})
    }
}
export {admin}