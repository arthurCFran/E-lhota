import { filterProducts } from "../services/product.service.js";

const  listProducts = async (req, res) => {
  try {
    const filters = {
      categoria: req.query.categoria || null,
      titulo: req.query.titulo || null,
    };
    const products = await filterProducts(filters);
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar produtos" });
  }
}

export { listProducts };