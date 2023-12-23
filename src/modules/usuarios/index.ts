import { PrismaUsuarioRepository } from "./repositories/implementations/prismaUsuarioRepository";
import { CriarUsuarioController } from "./controllers/criarUsuarioController";
import { CriarUsuarioServices } from "./services/criarUsuarioService";
import { BuscarPorIdUsuarioController } from "./controllers/buscarPorIdusuarioController";
import { BuscarPorIdUsuarioService } from "./services/buscarPorIdUsuarioService";

const repository = new PrismaUsuarioRepository();

const criarService = new CriarUsuarioServices(repository);
const criarController = new CriarUsuarioController(criarService);

const buscarPorIdService = new BuscarPorIdUsuarioService(repository);
const buscarPorIdController = new BuscarPorIdUsuarioController(
  buscarPorIdService
);

export { criarController, buscarPorIdController };
