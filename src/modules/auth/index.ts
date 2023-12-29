import { PrismaAuthRepository } from "./repositories/implementations/prismaAuthRepository";

import { LogarController } from "./controllers/logarController";
import { LogarService } from "./services/logarService";

const repository = new PrismaAuthRepository();

const logarService = new LogarService(repository);
const logarController = new LogarController(logarService);

export { logarController };
