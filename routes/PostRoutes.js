import express from "express";
import { createPost, getAllPosts, getPostById, deletePost, searchPosts } from "../controllers/PostController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.delete("/:id", protect, deletePost);
router.get("/search/:query", searchPosts);


export default router;
