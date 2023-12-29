import { UsuarioEntity } from "../../../usuarios/entities/usuarioEntity";
import { UsuarioMappingPrisma } from "../../../usuarios/mapping/usuariosMappingPrisma";
import { Token } from "../../entities/tokenEntity";
import { AuthRepository } from "../authRepository";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export class PrismaAuthRepository implements AuthRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async logar(email: string, senha: string): Promise<Token> {
    try {
      const usuario = await this.prisma.usuarios.findFirstOrThrow({
        where: { email, senha },
      });

      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
        },
        `${process.env.SECRET}`,
        {
          expiresIn: "1h",
        }
      );

      return { token };
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
