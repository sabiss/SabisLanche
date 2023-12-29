import { VerificarExistenciaService } from "../services/verificarExistenciaService";
import { Request, Response } from "express";

export class VerificarExistenciaController {
  constructor(private readonly service: VerificarExistenciaService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const email = req.body;
    try {
      const usuario = await this.service.execute(email);

      if (!usuario) {
        return res.status(404).send({ message: "Cadastro não encontrado" });
      }

      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).send({ message: "Erro ao buscar cadastro" });
    }
  }
}
