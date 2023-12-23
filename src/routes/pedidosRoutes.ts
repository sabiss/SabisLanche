import {
  fazerPedidoController,
  listarPedidosController,
} from "../modules/pedidos";
import { Request, Response, Router } from "express";

const routes = Router();

routes
  .post("/fazerPedido", (req: Request, res: Response) => {
    fazerPedidoController.handle(req, res);
  })
  .get("/pedidos", (req: Request, res: Response) => {
    listarPedidosController.handle(req, res);
  });
