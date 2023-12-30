import { Request, Response } from "express";
import { ListarPedidosDeUmUsuarioService } from "../services/listarPedidosDeUmUsuarioService";
import { PedidoEntity } from "../entities/pedidosEntity";

export class ListarPedidosDeUmUsuarioController {
  constructor(private readonly service: ListarPedidosDeUmUsuarioService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const id_usuario = Number(req.params.id);
      const pedidos = await this.service.execute(id_usuario);
      return res.status(200).json(pedidos);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao listar seus produtos - ${error}` });
    }
  }
}
