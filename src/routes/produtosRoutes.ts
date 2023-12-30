import { Request, Response, Router } from "express";
import { listarProdutosContoller } from "../modules/produtos";

const routes = Router();

routes.get("/produtos", (req: Request, res: Response) => {
  listarProdutosContoller.handle(req, res);
});
