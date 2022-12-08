import { GradePDFUsecase } from "./grade-pdf.usecase";

describe("Teste PDF", () => {
  test("PDF", async () => {
    const usecase = new GradePDFUsecase();
    await usecase.execute("d3d93466-a8f9-4726-9434-b60b2389dae6");

    expect(1).toBe(1);
  });
});
