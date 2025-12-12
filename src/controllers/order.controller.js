import { createOrderService } from "../services/order.service.js";

export const finalizeOrder = async (req, res) => {
    try {
        const { client, cart } = req.body;

        const { newClient, newOrder } = await createOrderService(client, cart);

        return res.status(201).json({
            message: "Pedido finalizado com sucesso!",
            orderId: newOrder.id,
            clientId: newClient.id
        });

    } catch (error) {
        console.error("Erro ao finalizar o pedido:", error);
        return res.status(500).json({ error: "Erro ao finalizar o pedido" });
    }
};


export { finalizeOrder };