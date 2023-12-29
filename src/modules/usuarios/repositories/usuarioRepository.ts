import { UsuarioDTO } from "../dtos/usuarioDTO";
import { UsuarioEntity } from "../entities/usuarioEntity";

export interface UsuarioRepository {
  criar(usuario: UsuarioDTO): Promise<void>;
  buscarPorId(id: number): Promise<UsuarioEntity>;
}
