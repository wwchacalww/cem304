import { Request, Response } from "express";
import { CheckImportUsecase } from "./check-import.usecase";

export class CheckImportController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    if (!file) {
      throw new Error("Arquivo não encontrado");
    }
    const usecase = new CheckImportUsecase();
    try {
      const check = await usecase.execute(file);
      return response.status(201).json({ check });
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
