import { Router } from "express";
import usuarios from "./usuarioRoutes";
import pedidos from "./pedidosRoutes";
import login from "./loginRoutes";
import produtos from "./produtosRoutes";

const routes = Router();

routes.use(usuarios, pedidos, login, produtos);

export default routes;
