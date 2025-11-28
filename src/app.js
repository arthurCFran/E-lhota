import express from "express";
import { prisma } from "./db/prisma.js";

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

//nossas rotas de front-end
app.use(express.static("views/html"));

app.use(express.static("views/assets"));

app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
