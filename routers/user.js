import { Router } from "express";
import { signUp, getAllUsers, getUserById, UpdateExceptPassword, UpdatePassword, logIn } from "../controllers/user.js"

const router = Router();

router.post("", signUp);
router.get("", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", UpdateExceptPassword);
router.put("/password/:id", UpdatePassword);
router.post("/login", logIn);

export default router;