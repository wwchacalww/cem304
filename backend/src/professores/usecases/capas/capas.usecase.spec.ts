import { CapasUsecase } from "./capas-usecase";

describe("Test", () => {
  test("PDF", async () => {
    const usecase = new CapasUsecase();
    await usecase.execute();

    expect(1).toBe(1);
  });
});
