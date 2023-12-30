import { PrismaClient } from "@prisma/client";
import { ProdutoRepository } from "../produtoRepository";
import { PrismaProdutosMapping } from "../../mapping/prismaProdutosMapping";
import { ProdutoEntity } from "../../entities/produtoEntity";

export class PrismaProdutoRepository implements ProdutoRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async listarProdutos(): Promise<ProdutoEntity[]> {
    try {
      const produtos = await this.prisma.cardapio.findMany();
      return produtos.map((produto) =>
        PrismaProdutosMapping.paraEntity(produto)
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async listarUmProduto(id: number): Promise<ProdutoEntity> {
    try {
      const produto = await this.prisma.cardapio.findFirstOrThrow({
        where: { id },
      });
      return PrismaProdutosMapping.paraEntity(produto);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
