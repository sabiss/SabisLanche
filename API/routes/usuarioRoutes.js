import { Router } from "express";
import usuarioController from "../controllers/usuarioController.js";

const routes = new Router();

routes
  .get("/", usuarioController.listar)
  .get("/pedidos/:id", usuarioController.listarPedidos)
  .get("/listarUmPedido/:id", usuarioController.listarUmPedido)
  .get("/listarProdutos", usuarioController.listarProdutos)
  .post("/cadastro", usuarioController.cadastrar)
  .post("/fazerPedido", usuarioController.fazerPedido)
  .put("/atualizarPedido", usuarioController.atualizarPedido)
  .delete("/deletarPedido/:id", usuarioController.deletarPedido);

export default routes;
