import { PedidoRepository } from "../repositories/pedidosRepository";
import { PedidoEntity } from "../entities/pedidosEntity";

export class ListarPedidosService {
  constructor(private readonly repository: PedidoRepository) {}
  async execute(): Promise<PedidoEntity[]> {
    const pedidos = await this.repository.listarPedidos();
    return pedidos;
  }
}
