import mongoose from "mongoose"
import dotenv from 'dotenv';

dotenv.config(); 

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
    await mongoose.connect(MONGODB_URI).then(()=>console.log("DB connected"))
}