import express from "express";
import { LoginUser, LogoutUser, SignUpUser, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router()

router.post('/signup', SignUpUser)
router.post('/login', LoginUser)
router.post('/logout', LogoutUser)
router.get('/profile', protect, getUserProfile)

export default router;