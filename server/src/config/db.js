import mongoose from "mongoose";

const connectdb = async()=>{
        try {
          await  mongoose.connect(`${process.env.MONGO_DB_URL}`)
          console.log("mongodb connected successfully");
        } catch (error) {
            console.log(error);
        }
    } 
    export default connectdb
