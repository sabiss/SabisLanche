import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const prisma = new PrismaClient();

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const secret = process.env.SECRET as Secret;
    const payload = jwt.verify(token, secret) as { email: string };
    const email = payload.email;
    const usuario = await prisma.usuarios.findFirstOrThrow({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: "Usuário não cadastrado" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Não autorizado" });
  } finally {
    await prisma.$disconnect();
  }

  next();
};

export default auth;
