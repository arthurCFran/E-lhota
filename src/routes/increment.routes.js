import { Router } from "express";
import { increaseStock} from "../controllers/increment.controller.js";

const router = Router();

router.patch("/:id/increment", increaseStock);

export default router;