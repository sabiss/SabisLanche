import { PedidoEntity } from "../entities/pedidosEntity";
import { pedidos } from "@prisma/client";

export class PedidoMappingPrisma {
  static converterParaPrisma(pedido: PedidoEntity): pedidos {
    return {
      id: pedido.id_produto,
      id_usuario: pedido.id_usuario,
      id_produto: pedido.id_produto,
      observacao: pedido.observacao == null ? null : pedido.observacao,
    };
  }

  static converterParaEntidade(pedido: pedidos): PedidoEntity {
    return {
      id: pedido.id,
      id_usuario: pedido.id_usuario,
      id_produto: pedido.id_produto,
      observacao: pedido.observacao == null ? undefined : pedido.observacao,
    };
  }
}
