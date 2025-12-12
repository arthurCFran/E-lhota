import { prisma } from "../db/prisma.js";

const createOrder = async (client, cart) => {
    const newClient = await prisma.client.create({
        data: {
            name: client.name,
            email: client.email,
            phone: client.phone,
            address: client.address,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
        }
    });

    const totalAmount = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const newOrder = await prisma.order.create({
        data: {
            clientId: newClient.id,
            totalAmount,
        }
    });

    const itemsPayload = cart.map(item => {
        return prisma.orderItem.create({
            data: {
                orderId: newOrder.id,
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            }
        });
    });

    await Promise.all(itemsPayload);

    return { newClient, newOrder };
};


export { createOrder } 