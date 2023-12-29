import { ProdutoEntity } from "../entities/produtoEntity";

export interface ProdutoRepository {
  listarProdutos(): Promise<ProdutoEntity[]>;
  listarUmProduto(): Promise<ProdutoEntity>;
}
