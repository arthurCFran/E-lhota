import { getCategories } from "../services/category.service.js";

const listCategories = async (req, res) => {
  try {
    const products = await getCategories();
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar categorias" });
  }
}

export { listCategories };