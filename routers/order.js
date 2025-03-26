import { Router } from "express";
import { getAllOrders, getOrdersByUserId, addOrder, deleteOrderById, updateOrderPayment } from "../controllers/order.js"
import { isUserAdmin, isUserIn } from "../middleware/checkToken.js";

const router = Router();

router.get("",isUserAdmin, getAllOrders);
router.get("/:userId",isUserIn,getOrdersByUserId);
router.post("",isUserIn,addOrder);
router.delete("/:id",isUserIn,deleteOrderById);
router.put("/:id",updateOrderPayment);

export default router; 