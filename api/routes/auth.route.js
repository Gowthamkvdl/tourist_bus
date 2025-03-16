import express from "express";
import { deleteUser, logout, register, updateUser } from "../controllers/auth.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/logout", logout);
router.put("/update/:id", updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
