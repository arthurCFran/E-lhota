import { prisma } from "../db/prisma.js";

const FAKESTORE_API_URL = "https://fakestoreapi.com/products";

const fetchProductsFromFakeStore = async () => {
    try {
        const response = await fetch(FAKESTORE_API_URL);
        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }

        const products = await response.json();

        let countInserted = 0;
        let countUpdated = 0;

        for (const p of products) {
            // estoque inicial: defina como quiser (fixo, random, etc)
            const initialQuantity = 20;

            // Verificação de produto existente
            const existingProduct = await prisma.product.findUnique({
                where: { id: p.id }
            });

            // upsert = cria ou atualiza automaticamente
            const savedProduct = await prisma.product.upsert({
                where: { id: p.id },
                update: {
                    title: p.title,
                    price: p.price,
                    description: p.description,
                    category: p.category,
                    image: p.image,
                    quantity: initialQuantity
                },
                create: {
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    description: p.description,
                    category: p.category,
                    image: p.image,
                    quantity: initialQuantity,
                    rating: {
                        create: {
                            rate: p.rating.rate,
                            count: p.rating.count
                        }
                    }
                }
            });

            // atualiza rating se já existir
            if (existingProduct && savedProduct.ratingId) {
                await prisma.rating.update({
                    where: { id: savedProduct.ratingId },
                    data: {
                        rate: p.rating.rate,
                        count: p.rating.count
                    }
                });
                countUpdated++;
            } else if (!existingProduct) {
                countInserted++;
            }
        }

        return {
            message: "Importação concluída",
            inserted: countInserted,
            updated: countUpdated
        };
    } catch (error) {
        console.error("Erro ao importar produtos:", error);
        throw new Error("Falha ao importar produtos da FakeStore API");
    }
}

export { fetchProductsFromFakeStore };