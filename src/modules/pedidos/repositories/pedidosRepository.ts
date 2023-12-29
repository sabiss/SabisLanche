import { PedidoEntity } from "../entities/pedidosEntity";

export interface PedidoRepository {
  fazerPedido(pedido: PedidoEntity): Promise<void>;
  listarPedidos(): Promise<PedidoEntity[]>;
  listarUmPedido(id: number): Promise<PedidoEntity>;
  listarPedidosDeUmUsuario(id_usuario: number): Promise<PedidoEntity[]>;
  atualizarPedido(
    id: number,
    novoIdProduto: number,
    novaObservacao: string
  ): Promise<void>;
  deletarPedido(id: number): Promise<void>;
}
