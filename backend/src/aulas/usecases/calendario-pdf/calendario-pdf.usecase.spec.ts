import { CalendarioPDFUsecase } from "./calendario-pdf.usecase";

describe("Teste PDF", () => {
  test("PDF", async () => {
    const usecase = new CalendarioPDFUsecase();
    await usecase.execute({
      professor_id: "356ebda9-8416-4d11-a3c2-d1b2a1759256",
      period: {
        in: new Date("2022-02-14 10:00:00"),
        out: new Date("2022-12-21 23:00:00"),
      },
    });

    expect(1).toBe(1);
  });
});
