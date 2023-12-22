import { PedidoDTO } from "../dtos/pedidosDTO";
import { PedidoRepository } from "../repositories/pedidosRepository";
import { PedidoMapping } from "../mappings/pedidoMapping";

export class criarPedidoService {
  constructor(private readonly repository: PedidoRepository) {}
  async execute(ordem: PedidoDTO): Promise<void> {
    const pedido = PedidoMapping.dtoParaEntity(ordem);
    await this.repository.fazerPedido(pedido);
  }
}
