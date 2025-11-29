import { Router } from "express";
import { getOrder } from "../controllers/order.controller.js";

const router = Router();

router.get("/", fetchFakeStoreProductsController);

export default router;