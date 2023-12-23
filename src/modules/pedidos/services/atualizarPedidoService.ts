import { PedidoRepository } from "../repositories/pedidosRepository";

export class AtualizarPedidoService {
  constructor(private readonly repository: PedidoRepository) {}
  async execute(
    id: number,
    novoIdProduto: number,
    novaObservaca: string
  ): Promise<void> {
    await this.repository.atualizar(id, novoIdProduto, novaObservaca);
  }
}
