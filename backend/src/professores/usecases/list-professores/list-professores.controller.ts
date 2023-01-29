import { Request, Response } from "express";
import { ListProfessoresUsecase } from "./list-professores.usecase";

export class ListProfessoresController {
  async handle(request: Request, response: Response) {
    const usecase = new ListProfessoresUsecase();

    const professores = await usecase.execute();

    const result = professores.map((p, index) => {
      return { id: p.id, nome: p.nome, index: index + 1 };
    });

    return response.status(200).json(result);
  }
}
