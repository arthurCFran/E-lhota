import { fetchProductsFromFakeStore } from "../services/fakestore.service.js";

const fetchFakeStoreProductsController = async (req, res) => {
    try {
        const products = await fetchProductsFromFakeStore();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
}

export { fetchFakeStoreProductsController };