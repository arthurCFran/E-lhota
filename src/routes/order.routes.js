import { Router } from "express";
import { finalizeOrder } from "../controllers/order.controller.js";

const router = Router();

router.get("/", finalizeOrder );

export default router;