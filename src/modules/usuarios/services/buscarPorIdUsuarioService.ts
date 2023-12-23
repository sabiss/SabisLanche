import { UsuarioEntity } from "../entities/usuarioEntity";
import { UsuarioRepository } from "../repositories/usuarioRepository";

export class BuscarPorIdUsuarioService {
  constructor(private readonly repository: UsuarioRepository) {}
  async execute(id: number): Promise<UsuarioEntity> {
    const usuario = await this.repository.buscarPorId(id);
    return usuario;
  }
}
