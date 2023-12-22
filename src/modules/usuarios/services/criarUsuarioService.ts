import { UsuarioRepository } from "../repositories/usuarioRepository"; //só serve pra tipar, o repositório que será usado mesmo é passado no parâmetro no arquivo index.ts
import { UsuarioEntity } from "../entities/usuarioEntity";

export class CriarUsuarioServices {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}
  async execute(user: UsuarioEntity): Promise<void> {
    const res = await this.usuarioRepository.criar(user);
  }
}
