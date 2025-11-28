import { Router } from "express";
import { fetchFakeStoreProductsController } from "../controllers/fakestore.controller.js";

const router = Router();

router.get("/", fetchFakeStoreProductsController);

export default router;