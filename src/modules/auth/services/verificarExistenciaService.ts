import { UsuarioEntity } from "../../usuarios/entities/usuarioEntity";
import { AuthRepository } from "../repositories/authRepository";

export class VerificarExistenciaService {
  constructor(private readonly repository: AuthRepository) {}
  async execute(email: string): Promise<UsuarioEntity> {
    const usuario = await this.repository.verificarExistencia(email);
    return usuario;
  }
}
