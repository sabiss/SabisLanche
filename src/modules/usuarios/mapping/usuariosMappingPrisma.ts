import { UsuarioEntity } from "../entities/usuarioEntity";
import { usuarios } from "@prisma/client";

export class UsuarioMappingPrisma {
  static converterParaUsuarioPrisma(usuario: UsuarioEntity): usuarios {
    return {
      email: usuario.email,
      senha: usuario.senha,
      id: usuario.id,
    };
  }
  static converterParaEntidadeUsuario(usuario: usuarios): UsuarioEntity {
    return {
      email: usuario.email,
      senha: usuario.senha,
      id: usuario.id,
    };
  }
}
