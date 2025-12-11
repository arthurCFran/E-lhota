import { prisma } from "../db/prisma.js";

const productDecrement = async (id, quant) => {
    const updated = await prisma.product.update({
        where: { id: Number(id) },
        data: {
            quantity: {
                decrement: quant
            }
        }
    })
    return updated;
}

export { productDecrement };