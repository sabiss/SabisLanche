import { Router } from "express";
import authController from "../controllers/authController.js";

const routes = new Router();
routes.post("/login", authController.logar);

export default routes;
