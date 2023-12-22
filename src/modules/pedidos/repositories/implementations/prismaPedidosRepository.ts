import { PrismaClient } from "@prisma/client";
import { PedidoEntity } from "../../entities/pedidosEntity";
import { PedidoRepository } from "../pedidosRepository";
import { PedidoMappingPrisma } from "../../mappings/pedidoMappingPrisma";

export class PrismaPedidosRepository implements PedidoRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async fazerPedido(pedido: PedidoEntity): Promise<void> {
    try {
      const pedidoConvertido = PedidoMappingPrisma.converterParaPrisma(pedido);
      await this.prisma.pedidos.create({ data: pedidoConvertido });
    } catch (error) {
      throw new Error("Erro ao fazer pedido");
    }
  }
  async listarPedidos(): Promise<PedidoEntity[]> {
    try {
      const usuarios = await this.prisma.pedidos.findMany();
      return usuarios.map((user) =>
        PedidoMappingPrisma.converterParaEntidade(user)
      );
    } catch (error) {
      throw new Error("Erro ao listar pedidos");
    }
  }
  async listarUmPedido(id: number): Promise<PedidoEntity> {
    try {
      const pedido = await this.prisma.pedidos.findUniqueOrThrow({
        where: { id },
      });
      return PedidoMappingPrisma.converterParaEntidade(pedido);
    } catch (error) {
      throw new Error("Erro ao buscar este pedido");
    }
  }
  async atualizar(
    id: number,
    novoIdProduto: number,
    novaObservacao: string
  ): Promise<void> {
    try {
      await this.prisma.pedidos.update({
        where: { id },
        data: { id: novoIdProduto, observacao: novaObservacao },
      });
    } catch (error) {
      throw new Error("Erro ao atualizar pedido");
    }
  }
}
