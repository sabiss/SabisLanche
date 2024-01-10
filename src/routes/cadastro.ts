import { criarController } from "../modules/usuarios";
import { Router, Request, Response } from "express";

const routes = Router();

routes
  .post("/cadastroUsuario", (req: Request, res: Response) => {
    criarController.handle(req, res);
  });

export default routes;
