import { Request, Response } from "express";
import { AddTurmaUsecase } from "./add-turma.usecase";

export class AddTurmaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, serie, turno, ano } = request.body;
    const usecase = new AddTurmaUsecase();

    try {
      const turma = await usecase.execute({ nome, serie, turno, ano });
      return response.status(201).json(turma);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
