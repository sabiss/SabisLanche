import { Request, Response, Router } from "express";
import {
  listarProdutosContoller,
  listarUmProdutoController,
} from "../modules/produtos";

const routes = Router();

routes
  .get("/produtos", (req: Request, res: Response) => {
    listarProdutosContoller.handle(req, res);
  })
  .get("/listarUmProduto/:id", (req: Request, res: Response) => {
    listarUmProdutoController.handle(req, res);
  });

export default routes;
