import { criarPedidoService } from "./services/criarPedidoService";
import { criarPedidoController } from "./controllers/criarPedidoController";
import { PrismaPedidosRepository } from "./repositories/implementations/prismaPedidosRepository";
import { ListarPedidosService } from "./services/listarPedidosService";
import { ListarPedidosController } from "./controllers/listarPedidosController";

const repository = new PrismaPedidosRepository();

const fazerPedidoService = new criarPedidoService(repository);
const fazerPedidoController = new criarPedidoController(fazerPedidoService);

const listarPedidosService = new ListarPedidosService(repository);
const listarPedidosController = new ListarPedidosController(
  listarPedidosService
);

export { fazerPedidoController, listarPedidosController };
