import { PedidoDTO } from "../dtos/pedidosDTO";
import { FazerPedidoService } from "../services/fazerPedidoService";
import { Request, Response } from "express";

export class FazerPedidoController {
  constructor(private readonly service: FazerPedidoService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const pedido = <PedidoDTO>req.body;
    await this.service.execute(pedido);
    return res.status(200).send({ message: "Pedido Criado" });
  }
}
