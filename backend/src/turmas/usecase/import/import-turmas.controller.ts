import { Request, Response } from "express";
import { ImportTurmasUsecase } from "./import-turmas.usecase";

export class ImportTurmasController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    if (!file) {
      throw new Error("Arquivo não encontrado");
    }
    const usecase = new ImportTurmasUsecase();
    try {
      await usecase.execute(file);
      return response.status(201).json({ message: "Turmas criadas" });
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
