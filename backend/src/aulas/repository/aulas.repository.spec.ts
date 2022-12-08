import { AulasRepositoryInterface } from "../domain/repository/aulas-repository.interface";
import { AulasRepository } from "./aulas.repository";

describe("Aulas Repository Test", () => {
  let repository: AulasRepositoryInterface;

  beforeAll(() => {
    repository = new AulasRepository();
  });
  test("Aulas", async () => {
    const input = {
      professor_id: "3bea4ab9-555e-4f99-b683-d5d98dd0c3de",
      period: {
        in: new Date("2022-04-14 00:00:00"),
        out: new Date("2022-06-13 00:00:00"),
      },
    };

    const aulas = await repository.listRF(input);

    console.log(aulas);
  });
});
