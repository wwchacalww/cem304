import { prisma } from "../../@shared/db/prisma.client";
import { Turma } from "../domain/entity/turma";
import { TurmaRepositoryInterface } from "../domain/repository/turmas-repository.interface";
import { TurmasRepository } from "./turmas.repository";

describe("Turmas Repository teste", () => {
  let repository: TurmaRepositoryInterface;

  beforeAll(() => {
    repository = new TurmasRepository();
  });
  test("Criar turmas e consultas", async () => {
    const EntityA = new Turma({
      nome: "1º ano A - Matutino",
      serie: "1º ano do Ensino Médio",
      turno: "matutino",
      ano: 2022,
    });

    await repository.add(EntityA);

    const show = await repository.show(EntityA.id);

    expect(EntityA.id).toBe(show.id);
    expect(show.ano).toEqual(2022);

    const EntityB = new Turma({
      nome: "1º ano B - Vespertino",
      serie: "1º ano do Ensino Médio",
      turno: "vespertino",
      ano: 2022,
    });

    await repository.add(EntityB);

    const list = await repository.list(2022);

    expect(list.length).toEqual(2);

    await prisma.turma.deleteMany({
      where: {
        id: {
          in: [EntityA.id, EntityB.id],
        },
      },
    });
  });
});
