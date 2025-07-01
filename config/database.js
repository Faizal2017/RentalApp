import mongoose from "mongoose";

let connected = false;

export const connectDB = async ()=>{

    if (connected) {
        console.log("MongoDB is already connected");
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log("MongoDB connected successfully ✅️ 🎉 ");
    } catch (error) {
        console.error("MongoDB connection error ❌:", error);
        throw error;
    }
}