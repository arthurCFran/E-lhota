import express from "express";
import { prisma } from "./db/prisma.js";

//importando as rotas da API
import apiRoutes from "./routes/fakestore.routes.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

//nossas rotas de API

app.use("/api", apiRoutes);

//nossas rotas de front-end
app.use(express.static("views/html"));

app.use(express.static("views/assets"));

app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
