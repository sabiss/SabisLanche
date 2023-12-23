import { PedidoRepository } from "../repositories/pedidosRepository";

export class DeletarPedidoService {
  constructor(private readonly repository: PedidoRepository) {}
  async execute(id: number): Promise<void> {
    await this.repository.deletarPedido(id);
  }
}
