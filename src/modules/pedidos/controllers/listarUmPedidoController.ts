import { ListarUmPedidoService } from "../services/listarUmPedidoService";
import { Request, Response } from "express";

export class ListarUmPedidoController {
  constructor(private readonly service: ListarUmPedidoService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const pedido = await this.service.execute(Number(id));
    return res.status(200).json(pedido);
  }
}
