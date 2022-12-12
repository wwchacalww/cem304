import { CalendarioPDFUsecase } from "./calendario-pdf.usecase";

describe("Teste PDF", () => {
  test("PDF", async () => {
    const usecase = new CalendarioPDFUsecase();
    await usecase.execute({
      professor_id: "da6d1b5a-da10-43de-9f1d-f1f143f646cb",
      period: {
        in: new Date("2022-02-14 10:00:00"),
        out: new Date("2022-12-21 23:00:00"),
      },
    });

    expect(1).toBe(1);
  });
});
