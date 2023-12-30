import { Request, Response } from "express";
import { ListarProdutosServices } from "../services/listarProdutosService";

export class ListarProdutosController {
  constructor(private readonly service: ListarProdutosServices) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const produtos = await this.service.execute();

      if (produtos.length === 0) {
        return res.status(404).send({ message: "Produtos não encontrados" });
      } else {
        return res.status(200).json(produtos);
      }
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao listar projetos - ${error}` });
    }
  }
}
