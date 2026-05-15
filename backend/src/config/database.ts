import mongoose from "mongoose";
import { env } from "./env"

export const connectDB = async()=>{
    try{
        await mongoose.connect(env.MONGO_URI);
        console.log("Mongodb Connected!");
    }catch(err){
        console.error("Database connection failed");
        process.exit(1);
    }
}