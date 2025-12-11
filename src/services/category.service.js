import { prisma } from "../db/prisma.js";


const getCategories = async () => {
    try {
        return await prisma.product.findMany({
            distinct: ['category'],
            select: {
                category: true,
            },
        });
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        throw error;
    }
}


export { getCategories };