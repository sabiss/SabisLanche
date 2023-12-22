import { PedidoDTO } from "../dtos/pedidosDTO";
import { PedidoEntity } from "../entities/pedidosEntity";

export class PedidoMapping {
  static dtoParaEntity(pedido: PedidoDTO): PedidoEntity {
    return {
      id: pedido.id,
      id_produto: pedido.id_produto,
      id_usuario: pedido.id_usuario,
      observacao: pedido.observacao,
    };
  }
}
