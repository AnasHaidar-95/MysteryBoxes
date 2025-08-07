import express from "express";
import { showAllProducts, addNewProduct } from "../contrllers/productController.js";

const router = express.Router();

router.get("/showAllProducts", showAllProducts);
router.post("/addNewProduct", addNewProduct);

export default router;
