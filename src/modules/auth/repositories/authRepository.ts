import { UsuarioEntity } from "../../usuarios/entities/usuarioEntity";

export interface AuthRepository {
  logar(email: string, senha: string): Promise<UsuarioEntity>;
  verificarExistencia(email: string): Promise<UsuarioEntity>;
}
