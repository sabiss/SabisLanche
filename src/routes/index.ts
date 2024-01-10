import { Router } from "express";
import usuarios from "./usuarioRoutes";
import pedidos from "./pedidosRoutes";
import login from "./loginRoutes";
import produtos from "./produtosRoutes";
import auth from "../middleware/authMiddleware";
import cadastro from "./cadastro"

const routes = Router();

routes.use(login, cadastro, auth ,usuarios, pedidos, produtos);

export default routes;
