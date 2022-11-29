import { Request, Response } from "express";
import { EnturmarUsecase } from "./enturmar.usecase";

export class EnturmarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const usecase = new EnturmarUsecase();
    const { professor_id, turma_id } = request.body;
    try {
      const result = await usecase.execute(professor_id, turma_id);
      return response.status(201).json(result);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
