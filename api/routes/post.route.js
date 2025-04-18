import express from "express";
import {
  addImages,
  addPost,
  addPostRating,
  deletePost,
  getPost,
  getPosts,
  getSavedPosts,
  postView,
  profilePosts,
  savePost,
  updatePost,
} from "../controllers/post.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addPost);
router.post("/rating", verifyToken, addPostRating);
router.post("/fav", verifyToken, savePost);
router.get("/fav", verifyToken, getSavedPosts);
router.get("/profile", verifyToken, profilePosts);
router.get("/posts", getPosts);
router.post("/add-images/:id", verifyToken, addImages);
router.get("/:id", getPost);
router.put("/view/:id", verifyToken, postView)
router.put("/:id", verifyToken , updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
