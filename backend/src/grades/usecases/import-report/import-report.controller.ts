import { Request, Response } from "express";
import { ImportReportUsecase } from "./import-report.usecase";

export class ImportReportController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    if (!file) {
      throw new Error("Arquivo não encontrado");
    }
    const usecase = new ImportReportUsecase();
    try {
      await usecase.execute(file);
      return response.status(201).json({ message: "Aulas criadas" });
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
