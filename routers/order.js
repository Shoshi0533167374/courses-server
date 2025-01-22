import { Router } from "express";
import { getAllOrders, getOrdersByUserId, addOrder, deleteOrderById, updateOrderPayment } from "../controllers/order.js"

const router = Router();

router.get("", getAllOrders);
router.get("/:userId",getOrdersByUserId);
router.post("",addOrder);
router.delete("/:id",deleteOrderById);
router.put("/:id",updateOrderPayment);

export default router; 