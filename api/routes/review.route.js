import express from "express";
import { addReview } from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addReview);

export default router;
