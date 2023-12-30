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
    const produtos = await this.prisma.cardapio.findMany();
    return produtos.map((produto) => PrismaProdutosMapping.paraEntity(produto));
  }
  async listarUmProduto(id: number): Promise<ProdutoEntity> {
    const produto = await this.prisma.cardapio.findFirstOrThrow({
      where: { id },
    });
    return PrismaProdutosMapping.paraEntity(produto);
  }
}
