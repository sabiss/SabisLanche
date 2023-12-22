import { UsuarioRepository } from "../repositories/usuarioRepository"; //só serve pra tipar, o repositório que será usado mesmo é passado no parâmetro no arquivo index.ts
import { UsuarioMapping } from "../mapping/usuariosMapping";
import { UsuarioDTO } from "../dtos/usuarioDTO";

export class CriarUsuarioServices {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}
  async execute(user: UsuarioDTO): Promise<void> {
    const usuario = UsuarioMapping.dtoParaEntity(user);
    await this.usuarioRepository.criar(usuario);
  }
}
