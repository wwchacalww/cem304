import { prisma } from "../../@shared/db/prisma.client";
import { Professor } from "../domain/entity/professor";
import { ProfessoresRepositoryInterface } from "../domain/repository/professores-repository.interface";
import { ProfessoresRepository } from "./professores.repository";

describe("Professores Repository test", () => {
  let repository: ProfessoresRepositoryInterface;

  beforeAll(() => {
    repository = new ProfessoresRepository();
  });

  test("Criar, listar e consultar Professores", async () => {
    const fulano = new Professor({ nome: "Fulano" });
    const siclano = new Professor({ nome: "Siclano" });

    await repository.add(fulano);
    await repository.add(siclano);

    const show = await repository.show(fulano.id);
    const list = await repository.list();

    expect(fulano.nome).toBe(show.nome);
    expect(list.length).toEqual(2);

    await prisma.professor.deleteMany({
      where: {
        id: {
          in: [fulano.id, siclano.id],
        },
      },
    });
  });
});
