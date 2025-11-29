import { createOrder } from "../services/order.service.js";

const getOrder = async (req, res) => {
  try {

    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro encontrar o Pedido" });
  }
}

export { getOrder };