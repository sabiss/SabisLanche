import { Request, Response, Router } from "express";
import {
  atualizarPedidoController,
  deletarPedidoController,
  fazerPedidoController,
  listarPedidosController,
  listarPedidosDeUmUsuarioController,
  listarUmPedidoController,
} from "../modules/pedidos";

const routes = Router();

routes
  .post("/fazerPedido", (req: Request, res: Response) => {
    fazerPedidoController.handle(req, res);
  })
  .get("/pedidos", (req: Request, res: Response) => {
    listarPedidosController.handle(req, res);
  })
  .get("/pedido/:id", (req: Request, res: Response) => {
    listarUmPedidoController.handle(req, res);
  })
  .get("/listarSeusPedidos/:id", (req: Request, res: Response) => {
    listarPedidosDeUmUsuarioController.handle(req, res);
  })
  .put("/atualizarPedido/:id", (req: Request, res: Response) => {
    atualizarPedidoController.handle(req, res);
  })
  .delete("/deletarPedido/:id", (req: Request, res: Response) => {
    deletarPedidoController.handle(req, res);
  });

export default routes;
