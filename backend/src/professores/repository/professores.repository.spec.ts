import { Turma } from "../../turmas/domain/entity/turma";
import { prisma } from "../../@shared/db/prisma.client";
import { Professor } from "../domain/entity/professor";
import { ProfessoresRepositoryInterface } from "../domain/repository/professores-repository.interface";
import { ProfessoresRepository } from "./professores.repository";
import { Materia } from "../../materias/domain/entity/materia";

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

  test("Enturmar professor", async () => {
    const fulano = new Professor({ nome: "Fulano" });
    await repository.add(fulano);

    const turma = new Turma({
      nome: "Fake",
      serie: "Fake",
      turno: "matutino",
      ano: 2022,
    });

    await prisma.turma.create({
      data: {
        id: turma.id,
        nome: "Fake",
        serie: "Fake",
        turno: "matutino",
        ano: 2022,
      },
    });

    const professor = await repository.enturmar(fulano.id, turma.id);

    expect(professor.turmas[0].nome).toBe("Fake");
    await prisma.professoresOnTurmas.delete({
      where: {
        professor_id_turma_id: {
          professor_id: fulano.id,
          turma_id: turma.id,
        },
      },
    });

    await prisma.turma.delete({ where: { id: turma.id } });
    await prisma.professor.delete({ where: { id: fulano.id } });
  });

  test("Registrar materias para o professor", async () => {
    const fulano = new Professor({ nome: "Fulano" });
    await repository.add(fulano);

    const pdum = new Materia({
      nome: "Fake",
      ano: 2022,
    });

    await prisma.materia.create({
      data: {
        id: pdum.id,
        nome: "Fake",
        ano: 2022,
      },
    });

    const professor = await repository.diciplinar(pdum.id, fulano.id);

    expect(professor.materias[0].nome).toBe("Fake");
    await prisma.materiasOnProfessores.delete({
      where: {
        materia_id_professor_id: {
          materia_id: pdum.id,
          professor_id: fulano.id,
        },
      },
    });

    await prisma.materia.delete({ where: { id: pdum.id } });
    await prisma.professor.delete({ where: { id: fulano.id } });
  });
});
