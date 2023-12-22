import { PrismaClient } from "@prisma/client";
import { UsuarioEntity } from "../../entities/usuarioEntity";
import { UsuarioRepository } from "../usuarioRepository";
import { UsuarioMappingPrisma } from "../../mapping/usuariosMappingPrisma";

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
}
