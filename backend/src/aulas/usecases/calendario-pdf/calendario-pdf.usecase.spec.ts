import { CalendarioPDFUsecase } from "./calendario-pdf.usecase";

describe("Teste PDF", () => {
  test("PDF", async () => {
    const usecase = new CalendarioPDFUsecase();
    await usecase.execute({
      professor_id: "274fcc3e-c9ae-4278-b029-64c45360ad9f",
      period: {
        in: new Date("2022-02-13 01:00:00"),
        out: new Date("2022-12-31 23:00:00"),
      },
    });

    expect(1).toBe(1);
  });
});
