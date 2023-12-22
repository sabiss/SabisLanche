import { PedidoDTO } from "../dtos/pedidosDTO";
import { criarPedidoService } from "../services/criarPedidoService";
import { Request, Response } from "express";

export class criarPedidoController {
  constructor(private readonly service: criarPedidoService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const pedido = <PedidoDTO>req.body;
    await this.service.execute(pedido);
    return res.status(200).send({ message: "Pedido Criado" });
  }
}
