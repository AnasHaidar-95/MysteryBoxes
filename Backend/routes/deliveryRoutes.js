import express from "express";
import { updateDeliveryStatus, getUserDeliveries } from "../contrllers/deliveryController.js";

const router = express.Router();

router.put("/update-status/:id", updateDeliveryStatus);
router.get("/user/:userId", getUserDeliveries); 
export default router;