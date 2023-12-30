import { Request, Response } from "express";
import { ListarPedidosService } from "../services/listarPedidosService";

export class ListarPedidosController {
  constructor(private readonly service: ListarPedidosService) {}
  async handle(req: Request, res: Response) {
    try {
      const pedidos = await this.service.execute();
      return res.status(200).json(pedidos);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro so listar produtos - ${error}` });
    }
  }
}
