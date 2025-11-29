import { prisma } from "../db/prisma.js";

const createOrder = async (order) => {

    try {
        prisma.order.create({
            data: {
                clientId: order.clientId,
                totalAmount: order.totalAmount,
                orderItems: {
                    createMany: {
                        orderId: id,
                        productId: order.itens.id,
                        quantity: order.itens.quantity,
                        price: order.itens.price,
                    }
                }
            }
        })
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        return ("Falha ao Criar Pedido");
    }
}

export {createOrder} 