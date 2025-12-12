import { createOrder } from "../services/order.service.js";

const finalizeOrder = async (req, res) => {
    try {
        console.log("BODY RECEBIDO:", req.body);

        let { client, cart } = req.body;

        if (!Array.isArray(cart)) {
            try {
                cart = JSON.parse(cart);
            } catch {
                cart = [];
            }
        }

        if (!Array.isArray(cart)) {
            return res.status(400).json({ error: "Carrinho inválido" });
        }

        const result = await createOrder(client, cart);

        return res.status(201).json({
            message: "Pedido criado!",
            orderId: result.newOrder.id,
            clientId: result.newClient.id
        });

    } catch (error) {
        console.error("Erro ao finalizar pedido:", error);
        return res.status(500).json({ error: "Erro ao finalizar pedido" });
    }
}

export { finalizeOrder };