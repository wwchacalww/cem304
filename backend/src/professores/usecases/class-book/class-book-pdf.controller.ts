import { Request, Response } from "express";
import { ClassBookPDFUsecase } from "./class-book-pdf.usecase";

export class ClassBookPDFController {
  async handle(request: Request, response: Response) {
    const { file } = request;
    if (!file) {
      throw new Error("Arquivo não encontrado");
    }
    const usecase = new ClassBookPDFUsecase();
    try {
      await usecase.execute(file);
      return response.status(201).json({ message: "Capas criadas" });
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
