import { PrismaUsuarioRepository } from "./repositories/implementations/prismaUsuarioRepository";

import { CriarUsuarioController } from "./controllers/criarUsuarioController";

import { CriarUsuarioServices } from "./services/criarUsuarioService";

const repository = new PrismaUsuarioRepository();

const criarService = new CriarUsuarioServices(repository);
const criarController = new CriarUsuarioController(criarService);

export { criarController };
