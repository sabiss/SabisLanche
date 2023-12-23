import { criarPedidoService } from "./services/criarPedidoService";
import { criarPedidoController } from "./controllers/criarPedidoController";
import { PrismaPedidosRepository } from "./repositories/implementations/prismaPedidosRepository";
import { ListarPedidosService } from "./services/listarPedidosService";
import { ListarPedidosController } from "./controllers/listarPedidosController";
import { ListarUmPedidoService } from "./services/listarUmPedidoService";
import { ListarUmPedidoController } from "./controllers/listarUmPedidoController";
import { AtualizarPedidoService } from "./services/atualizarPedidoService";
import { AtualizarPedidoController } from "./controllers/atualizarPedidoController";
import { DeletarPedidoService } from "./services/deletarPedidoService";
import { DeletarPedidoController } from "./controllers/deletarPedidoController";

const repository = new PrismaPedidosRepository();

const fazerPedidoService = new criarPedidoService(repository);
const fazerPedidoController = new criarPedidoController(fazerPedidoService);

const listarPedidosService = new ListarPedidosService(repository);
const listarPedidosController = new ListarPedidosController(
  listarPedidosService
);

const listarUmPedidoService = new ListarUmPedidoService(repository);
const listarUmPedidoController = new ListarUmPedidoController(
  listarUmPedidoService
);

const atualizarPedidoService = new AtualizarPedidoService(repository);
const atualizarPedidoController = new AtualizarPedidoController(
  atualizarPedidoService
);

const deletarPedidoService = new DeletarPedidoService(repository);
const deletarPedidoController = new DeletarPedidoController(
  deletarPedidoService
);

export {
  fazerPedidoController,
  listarPedidosController,
  listarUmPedidoController,
  atualizarPedidoController,
  deletarPedidoController,
};
