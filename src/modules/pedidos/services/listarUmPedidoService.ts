import { PedidoEntity } from "../entities/pedidosEntity";
import { PedidoRepository } from "../repositories/pedidosRepository";

export class ListarUmPedidoService {
  constructor(private readonly repository: PedidoRepository) {}
  async execute(id: number): Promise<PedidoEntity> {
    const pedido = await this.repository.listarUmPedido(id);
    return pedido;
  }
}
