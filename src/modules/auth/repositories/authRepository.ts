import { Token } from "../entities/tokenEntity";
import { UsuarioEntity } from "../../usuarios/entities/usuarioEntity";

export interface AuthRepository {
  logar(email: string, senha: string): Promise<Token>;
  verificarExistencia(email: string): Promise<UsuarioEntity>;
}
