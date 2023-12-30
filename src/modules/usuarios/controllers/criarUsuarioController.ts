import { UsuarioDTO } from "../dtos/usuarioDTO";
import { CriarUsuarioServices } from "../services/criarUsuarioService"; //só tipa
import { Request, Response } from "express";

export class CriarUsuarioController {
  constructor(private readonly service: CriarUsuarioServices) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const usuario = <UsuarioDTO>req.body;
      await this.service.execute(usuario);
      return res.status(200).send({ message: "Usuário criado" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao criar usuário - ${error}` });
    }
  }
}
