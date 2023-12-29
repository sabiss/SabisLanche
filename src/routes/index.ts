import { Router } from "express";
import usuarios from "./usuarioRoutes";
import pedidos from "./pedidosRoutes";
import login from "./loginRoutes";

const routes = Router();

routes.use(usuarios, pedidos, login);

export default routes;
