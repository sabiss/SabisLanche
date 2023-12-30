import { ProdutoEntity } from "../entities/produtoEntity";
import { ProdutoRepository } from "../repositories/produtoRepository";

export class ListarProdutosServices {
  constructor(private readonly repository: ProdutoRepository) {}
  async execute(): Promise<ProdutoEntity[]> {
    return await this.repository.listarProdutos();
  }
}
