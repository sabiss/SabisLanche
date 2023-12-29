import { PedidoEntity } from "../entities/pedidosEntity";
import { PedidoRepository } from "../repositories/pedidosRepository";

export class ListarPedidosDeUmUsuarioService {
  constructor(private readonly repository: PedidoRepository) {}
  async execute(id_usuario: number): Promise<PedidoEntity[]> {
    const pedidos = await this.repository.listarPedidosDeUmUsuario(id_usuario);
    return pedidos;
  }
}
