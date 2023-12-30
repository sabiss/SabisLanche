import { LogarService } from "../services/logarService";
import { Request, Response } from "express";

export class LogarController {
  constructor(private readonly service: LogarService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { email, senha } = req.body;
      const token = await this.service.execute(email, String(senha));
      if (!token) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }
      return res.status(200).json(token);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao fazer login - ${error}` });
    }
  }
}
