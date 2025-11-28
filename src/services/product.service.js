import { prisma } from "../db/prisma.js";


const filterProducts = async (filters) => {
    const { categoria, titulo } = filters;

    return await prisma.product.findMany({
        where: {
            AND: [
                categoria ? { category: categoria } : {}, //verifica se há filtro por categoria
                titulo ? { title: { contains: titulo } } : {},
            ],
        },
        select: {
            id: true,
            title: true,
            price: true,
            category: true,
            image: true,
            quantity: true,
            rating: {
                select: {
                    rate: true,
                    count: true,
                },
            },
        },
    });
}


export { filterProducts };
