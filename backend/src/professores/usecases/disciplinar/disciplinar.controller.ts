import { Request, Response } from "express";
import { DisciplinarUsecase } from "./disciplinar.usecase";

export class DisciplinarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const usecase = new DisciplinarUsecase();
    const { materia_id, professor_id } = request.body;
    try {
      const result = await usecase.execute(materia_id, professor_id);
      return response.status(201).json(result);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
