import { UsuarioEntity } from "../entities/usuarioEntity";
import { UsuarioDTO } from "../dtos/usuarioDTO";

export class UsuarioMapping {
  static dtoParaEntity(usuario: UsuarioDTO): UsuarioEntity {
    return {
      id: usuario.id,
      senha: usuario.senha,
      email: usuario.email,
    };
  }
}
