import { UsuarioEntity } from "../../usuarios/entities/usuarioEntity";
import { AuthRepository } from "../repositories/authRepository";

export class LogarService {
  constructor(private readonly repository: AuthRepository) {}
  async execute(email: string, senha: string): Promise<UsuarioEntity> {
    const usuario = await this.repository.logar(email, senha);
    return usuario;
  }
}
