import { Request, Response } from "express";
import { AddProfessorUsecase } from "./add-professor.usecase";

export class AddProfessorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome } = request.body;
    const usecase = new AddProfessorUsecase();
    try {
      const result = await usecase.execute(nome);
      return response.status(201).json(result.toJSON());
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
