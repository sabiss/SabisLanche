import { PrismaProdutoRepository } from "./repositories/implementations/prismaProdutoRepository";

import { ListarProdutosServices } from "./services/listarProdutosService";
import { ListarProdutosController } from "./controller/listarProdutosContoller";
import { ListarUmProdutoService } from "./services/listarUmProdutoService";
import { ListarUmProdutoController } from "./controller/listarUmProdutoController";

const repository = new PrismaProdutoRepository();

const listarProdutosService = new ListarProdutosServices(repository);
const listarProdutosContoller = new ListarProdutosController(
  listarProdutosService
);

const listarUmProdutoService = new ListarUmProdutoService(repository);
const listarUmProdutoController = new ListarUmProdutoController(
  listarUmProdutoService
);

export { listarProdutosContoller, listarUmProdutoController };
