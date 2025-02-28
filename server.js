import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/PostRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 10000;
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:3000", "https://wrytit-frontend.onrender.com"], // Allow local access
    credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// ✅ Pehle Database Connect Karo, Phir Server Start Karo
connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => { // ← Add this
        console.log(`✅ Server is Running on: ${PORT}`);
      });
}).catch(err => {
    console.error("❌ Database Connection Failed:", err);
});
