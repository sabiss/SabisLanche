import { ProdutoEntity } from "../entities/produtoEntity";

export interface ProdutoRepository {
  listarProdutos(): Promise<ProdutoEntity[]>;
  listarUmProduto(id: number): Promise<ProdutoEntity>;
}
