import { UsuarioEntity } from "../entities/usuarioEntity";

export interface UsuarioRepository {
  criar(usuario: UsuarioEntity): Promise<void>;
}
