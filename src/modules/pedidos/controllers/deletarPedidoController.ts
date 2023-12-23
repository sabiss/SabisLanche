import { DeletarPedidoService } from "../services/deletarPedidoService";
import { Request, Response } from "express";

export class DeletarPedidoController {
  constructor(private readonly service: DeletarPedidoService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    await this.service.execute(Number(id));
    return res.status(200).send({ message: "Pedido Deletado" });
  }
}
