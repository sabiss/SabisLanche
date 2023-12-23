import { AtualizarPedidoService } from "../services/atualizarPedidoService";
import { Request, Response } from "express";

export class AtualizarPedidoController {
  constructor(private readonly service: AtualizarPedidoService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const { novoIdProduto, novaObservacao } = req.body;
    await this.service.execute(Number(id), novoIdProduto, novaObservacao);
    return res.status(200).send({ message: "Pedido Atualizado" });
  }
}
