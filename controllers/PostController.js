import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const {title, description, content} = req.body;
        const userId = req.user.id;

        if(!title || !description || !content) {
            return res.status(400).json({message: "All fields are required"});
        }

        const post = await Post.create({
            title,
            description,
            content,
            author: userId,
        })

        res.status(201).json(post);

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log(error);
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "name email profilePic");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log(error);
    }
}

export const getPostById = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("author", "name email profilePic");
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

export const deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Check if the user deleting the post is the author
      if (post.author.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to delete this post" });
      }
  
      await post.deleteOne();
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

export const searchPosts = async (req, res) => {
  try {
    const query = req.params.query;
    if(!query) {
      return res.json([])
    }
    const result = await Post.find({
      $or: [
        {title: {$regex: query, $options: "i"}},
        {description: {$regex: query, $options: "i"}},
        {content: {$regex: query, $options: "i"}}
      ]
    })
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
    console.log(error);
  }
}
