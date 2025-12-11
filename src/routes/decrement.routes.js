import { Router } from "express";
import { decreaseStock} from "../controllers/decrement.controller.js";

const router = Router();

router.patch("/:id/decrement", decreaseStock);

export default router;