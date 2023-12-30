import { BuscarPorIdUsuarioService } from "../services/buscarPorIdUsuarioService";
import { UsuarioEntity } from "../entities/usuarioEntity";
import { Request, Response } from "express";

export class BuscarPorIdUsuarioController {
  constructor(private readonly service: BuscarPorIdUsuarioService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const usuario = await this.service.execute(Number(id));
      return res.status(200).send(usuario);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro buscar esye usuário - ${error}` });
    }
  }
}
