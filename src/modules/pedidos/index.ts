import { criarPedidoService } from "./services/criarPedidoService";
import { criarPedidoController } from "./controllers/criarPedidoController";
import { PrismaPedidosRepository } from "./repositories/implementations/prismaPedidosRepository";

const repository = new PrismaPedidosRepository();

const fazerPedidoService = new criarPedidoService(repository);
const fazerPedidoController = new criarPedidoController(fazerPedidoService);
