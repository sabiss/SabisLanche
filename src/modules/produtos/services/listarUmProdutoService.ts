import { ProdutoEntity } from "../entities/produtoEntity";
import { ProdutoRepository } from "../repositories/produtoRepository";

export class ListarUmProdutoService {
  constructor(private readonly repository: ProdutoRepository) {}
  async execute(id: number): Promise<ProdutoEntity> {
    const produto = await this.repository.listarUmProduto(id);
    return produto;
  }
}
