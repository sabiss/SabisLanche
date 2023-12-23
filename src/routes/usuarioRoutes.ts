import { criarController } from "../modules/usuarios";
import { Router, Request, Response } from "express";

const routes = Router();

routes.post("/usuario", (req: Request, res: Response) => {
  criarController.handle(req, res);
});

export default routes;
