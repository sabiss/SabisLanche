import { buscarPorIdController, criarController } from "../modules/usuarios";
import { Router, Request, Response } from "express";

const routes = Router();

routes
  .get("/usuario/:id", (req: Request, res: Response) => {
    buscarPorIdController.handle(req, res);
  })

export default routes;
