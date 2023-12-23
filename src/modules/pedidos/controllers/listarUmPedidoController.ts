import { ListarUmPedidoService } from "../services/listarUmPedidoService";
import { Request, Response } from "express";

export class ListarUmPedidoController {
  constructor(private readonly service: ListarUmPedidoService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const pedido = await this.service.execute(Number(id));
      if (!pedido) {
        return res.status(404).send({ message: "Pedido não encontrado" });
      }
      return res.status(200).json(pedido);
    } catch (error) {
      return res.status(500).send({ message: "Erro ao buscar Pedido" });
    }
  }
}
