import { cardapio } from "@prisma/client";
import { ProdutoEntity } from "../entities/produtoEntity";

export class PrismaProdutosMapping {
  static paraEntity(produto: cardapio): ProdutoEntity {
    return {
      nome: produto.nome,
      preco: produto.preco,
      id: produto.id,
    };
  }
  static paraPrisma(produto: ProdutoEntity): cardapio {
    return {
      nome: produto.nome,
      preco: produto.preco,
      id: produto.id,
    };
  }
}
