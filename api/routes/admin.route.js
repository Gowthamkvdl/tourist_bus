import express from "express";
import {
  getAllUsers,
  getAllPosts,
  verifyPost,
  toggleDisablePost,
  toggleBanUser,
  deletePost,
  deleteUser,
} from "../controllers/admin.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();


router.get("/users", getAllUsers);
router.get("/posts", getAllPosts);

router.patch("/posts/:postId/verify", verifyPost);
router.patch("/posts/:postId/disable", toggleDisablePost);
router.delete("/posts/:postId", deletePost);

router.patch("/users/:userId/ban", toggleBanUser);
router.delete("/users/:userId", deleteUser);

export default router;