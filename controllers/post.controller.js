import { Post } from "./../models/Post.js";
import { uploadImage, deleteImage } from "./../config/cloudinary.js";
import fs from "fs-extra";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    let image = null;
    let date = Date();

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      console.log(req.files.image)
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const post = new Post({ title, content, image, date, uid: req.uid });
    await post.save();
    return res.status(200).json(post);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  const posts = await Post.find({}).populate("uid");
  try {
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (post && post.image.public_id) {
      await deleteImage(post.image.public_id);
    }

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);

      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const updatedPost = await Post.findByIdAndUpdate(id, req.body);
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    if (post && post.image.public_id) {
      await deleteImage(post.image.public_id);
    }

    if (!post) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  try {
    if (post) {
      res.status(200).json({ post });
    } else {
      res.status(204).json({ message: "No post found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
