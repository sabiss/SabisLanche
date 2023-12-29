import { logarController } from "../modules/auth";
import { Request, Response, Router } from "express";

const routes = Router();

routes.post("/login", (req: Request, res: Response) => {
  logarController.handle(req, res);
});

export default routes;
