import express from "express";
import { prisma } from "./db/prisma.js";

//Roda de criação/finalização de pedidos
import orderRoutes from "./routes/order.routes.js";

//Roda de devolução de produtos ao estoque com incremento no estoque
import incrementRoutes from "./routes/increment.routes.js";

//Roda de alocação de produtos ao carrinho com decremento no estoque
import decrementRoutes from "./routes/decrement.routes.js";

//Roda de categorias dos produtos do banco de dados API
import categoryRoutes from "./routes/category.routes.js";

//Rota de Filtragem e Listagem de Produtos
import productRoutes from "./routes/product.routes.js";

//Roda de coleta de dados da FakeStore API
import apiRoutes from "./routes/fakestore.routes.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

//Roda de coleta de dados da FakeStore API
app.use("/api", apiRoutes);

//Rota de Filtragem e Listagem de Produtos: 
/*
/products?titulo=
/products?categoria=
*/
app.use("/products", productRoutes);

//Roda de categorias dos produtos do banco de dados API
app.use("/categories", categoryRoutes);

//Roda para atualizar quantidade produtos do banco de dados API
app.use("/stock", decrementRoutes);

//Roda para atualizar quantidade produtos do banco de dados API
app.use("/stock", incrementRoutes);

//Roda de criação/finalização de pedidos
app.use("/order", orderRoutes);

//nossas rotas de front-end
app.use(express.static("views/html"));

app.use(express.static("views/assets"));

app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
