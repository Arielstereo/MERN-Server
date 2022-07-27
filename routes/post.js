import express from "express";
const router = express.Router();
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
} from "./../controllers/post.controller.js";
import { validateToken } from "./../middlewares/validateToken.js";
import { postValidator } from "./../middlewares/validatePost.js";

router.post("/create", [validateToken, postValidator], createPost);
router.get("/getPosts", validateToken, getPosts);
router.put("/update/:id", [validateToken, postValidator], updatePost);
router.delete("/delete/:id", validateToken, deletePost);
router.get("/get/:id", validateToken, getPost);

export default router;
