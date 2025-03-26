import { Router } from "express";
import { signUp, getAllUsers, getUserById, UpdateExceptPassword, UpdatePassword, logIn } from "../controllers/user.js"
import { isUserAdmin, isUserIn } from "../middleware/checkToken.js";

const router = Router();
 
router.post("", signUp);
router.get("",isUserAdmin, getAllUsers);
router.get("/:id",isUserAdmin, getUserById);
router.put("/:id",isUserIn,UpdateExceptPassword);
router.put("/password/:id",isUserIn, UpdatePassword);
router.post("/login", logIn);

export default router;