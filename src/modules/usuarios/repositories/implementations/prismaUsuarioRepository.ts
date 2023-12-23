import { PrismaClient } from "@prisma/client";
import { UsuarioEntity } from "../../entities/usuarioEntity";
import { UsuarioRepository } from "../usuarioRepository";
import { UsuarioMappingPrisma } from "../../mapping/usuariosMappingPrisma";
import { usuarios } from "@prisma/client";

export class PrismaUsuarioRepository implements UsuarioRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async criar(user: UsuarioEntity): Promise<void> {
    try {
      const usuario = UsuarioMappingPrisma.converterParaUsuarioPrisma(user);
      await this.prisma.usuarios.create({ data: usuario });
    } catch (error) {
      throw new Error("Erro ao criar usuário");
    }
  }
  async buscarPorId(id: number): Promise<UsuarioEntity> {
    try {
      const usuario = <usuarios>await this.prisma.usuarios.findUniqueOrThrow({
        where: { id },
      });
      return UsuarioMappingPrisma.converterParaEntidadeUsuario(usuario);
    } catch (error) {
      throw new Error("Erro ao buscar esse usuário");
    }
  }
}
