import { UsuarioEntity } from "../../../usuarios/entities/usuarioEntity";
import { UsuarioMappingPrisma } from "../../../usuarios/mapping/usuariosMappingPrisma";
import { AuthRepository } from "../authRepository";
import { PrismaClient } from "@prisma/client";

export class PrismaAuthRepository implements AuthRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async logar(email: string, senha: string): Promise<UsuarioEntity> {
    try {
      const usuario = await this.prisma.usuarios.findFirstOrThrow({
        where: { email, senha },
      });
      return UsuarioMappingPrisma.converterParaEntidadeUsuario(usuario);
    } catch (error) {
      throw new Error("Erro ao fazer login");
    }
  }
  async verificarExistencia(email: string): Promise<UsuarioEntity> {
    try {
      const usuario = await this.prisma.usuarios.findUniqueOrThrow({
        where: { email: email },
      });
      return UsuarioMappingPrisma.converterParaEntidadeUsuario(usuario);
    } catch (error) {
      throw new Error("Erro ao buscar cadastro de usuário");
    }
  }
}
