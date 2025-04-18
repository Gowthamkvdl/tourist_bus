import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  disableBus,
  deleteBus,
  verifyBus,
  getUsers,
  banUser,
  makeAdmin,
  addRemark,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.put("/verify/:id", verifyToken, verifyBus);
router.put("/banuser/:id", verifyToken, banUser);
router.put("/remark/:id", verifyToken, addRemark);
router.put("/makeadmin/:id", verifyToken, makeAdmin);
router.put("/disable/:id", verifyToken, disableBus);
router.delete("/delete/:id", verifyToken, deleteBus);
router.get("/users", getUsers);

export default router;
