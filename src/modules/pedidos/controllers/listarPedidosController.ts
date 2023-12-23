import { Request, Response } from "express";
import { ListarPedidosService } from "../services/listarPedidosService";

export class ListarPedidosController {
  constructor(private readonly service: ListarPedidosService) {}
  async handle(req: Request, res: Response) {
    const pedidos = await this.service.execute();
    return res.status(200).json(pedidos);
  }
}
