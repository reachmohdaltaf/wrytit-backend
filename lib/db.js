import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // .env ko load karna zaroori hai

const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI:", MONGO_URI); // Debugging ke liye

export const connectDB = async () => {
    if (!MONGO_URI) {
        console.error("🛑 MONGO_URI is not defined in .env file");
        return;
    }

    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ Error in Connecting MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectDB;
