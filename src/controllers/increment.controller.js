import { productIncrement } from "../services/increment.service.js"

const increaseStock = async (req, res) => {
   try {
    const { id } = req.params
    const { quant } = req.body // quantidade da requisição "quantityReq"

    if (!quant || quant <= 0) {
      return res.status(400).json({ error: "Quantidade inválida" });
    }

    const product = await productIncrement(id, quant);
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao diminuir estoque" });
  }
}

export { increaseStock };

