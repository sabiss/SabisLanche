import { Token } from "../entities/tokenEntity";
import { AuthRepository } from "../repositories/authRepository";

export class LogarService {
  constructor(private readonly repository: AuthRepository) {}
  async execute(email: string, senha: string): Promise<Token> {
    const token = await this.repository.logar(email, senha);
    return token;
  }
}
