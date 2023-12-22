import { PedidoEntity } from "../entities/pedidosEntity";

export interface PedidoRepository {
  fazerPedido(pedido: PedidoEntity): Promise<void>;
  listarPedidos(): Promise<PedidoEntity[]>;
  listarUmPedido(id: number): Promise<PedidoEntity>;
  atualizar(
    id: number,
    novoIdProduto: number,
    novaObservacao: string
  ): Promise<void>;
}
