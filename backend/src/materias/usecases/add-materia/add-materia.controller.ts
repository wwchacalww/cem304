import { Request, Response } from "express";
import { AddMateriaUsecase } from "./add-materia.usecase";

export class AddMateriaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, ano } = request.body;
    const usecase = new AddMateriaUsecase();
    try {
      const result = await usecase.execute({ nome, ano });
      return response.status(201).json(result.toJSON());
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
