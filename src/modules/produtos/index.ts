import { PrismaProdutoRepository } from "./repositories/implementations/prismaProdutoRepository";

import { ListarProdutosServices } from "./services/listarProdutosService";
import { ListarProdutosController } from "./controller/listarProdutosContoller";

const repository = new PrismaProdutoRepository();

const listarProdutosService = new ListarProdutosServices(repository);
const listarProdutosContoller = new ListarProdutosController(
  listarProdutosService
);

export { listarProdutosContoller };
