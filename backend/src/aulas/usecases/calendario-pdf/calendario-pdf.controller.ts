import { Request, Response } from "express";
import { CalendarioPDFUsecase } from "./calendario-pdf.usecase";

export class CalendarioPDFController {
  async handle(request: Request, response: Response) {
    const { id } = request.query;
    const usecase = new CalendarioPDFUsecase();

    try {
      await usecase.execute({
        professor_id: id as string,
        period: {
          in: new Date("2022-02-14 10:00:00"),
          out: new Date("2022-12-21 23:00:00"),
        },
      });
      return response.status(200).json({ mesasge: "Calendario gerado" });
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
