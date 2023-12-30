import { Request, Response } from "express";
import { ListarUmProdutoService } from "../services/listarUmProdutoService";

export class ListarUmProdutoController {
  constructor(private readonly service: ListarUmProdutoService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const produto = await this.service.execute(id);

      if (!produto) {
        return res.status(404).send({ message: "Produto não encontrado" });
      } else {
        return res.status(200).json(produto);
      }
    } catch (error) {
      return res
        .status(500)
        .send({
          message: `Erro ao listar este produto em específico - ${error}`,
        });
    }
  }
}
