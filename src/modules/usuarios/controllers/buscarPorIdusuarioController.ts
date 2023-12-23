import { BuscarPorIdUsuarioService } from "../services/buscarPorIdUsuarioService";
import { UsuarioEntity } from "../entities/usuarioEntity";
import { Request, Response } from "express";

export class BuscarPorIdUsuarioController {
  constructor(private readonly service: BuscarPorIdUsuarioService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const usuario = await this.service.execute(Number(id));
    return res.status(200).send(usuario);
  }
}
