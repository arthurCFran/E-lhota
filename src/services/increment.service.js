import { prisma } from "../db/prisma.js";

const productIncrement = async (id, quant) => {
    const updated = await prisma.product.update({
        where: { id: Number(id) },
        data: {
            quantity: {
                increment: quant
            }
        }
    })
    return updated;
}

export { productIncrement };