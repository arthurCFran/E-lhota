import { prisma } from "../db/prisma.js";

const createOrder = async (order) => {

    try {
        return await prisma.order.create({
            data: {
                clientId: order.clientId,
                totalAmount: order.totalAmount,
                client: {
                    create: {
                        data: {
                            name: order.client.name,
                            email: order.client.email,
                            phone: order.client.phone,
                            address: order.client.address,
                            city: order.client.city,
                            state: order.client.state,
                            zipCode: order.client.zipCode,
                        }
                    },
                },
                orderItems: {
                    createMany: {
                        data: order.itens.map(item => ({
                            productId: item.id,
                            quantity: item.quantityReq,
                            price: item.price,
                        }))
                    }
                }
            }
        })
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        throw error;
    }
}

export {createOrder} 