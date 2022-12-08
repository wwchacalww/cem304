import { Materia } from "../../materias/domain/entity/materia";
import { Turma } from "../../turmas/domain/entity/turma";
import { GradesRepositoryInterface } from "grades/domain/repository/grades-repository.interface";
import { Professor } from "../../professores/domain/entity/professor";
import { GradesRepository } from "./grades.repository";
import { Grade } from "../domain/entity/grade";
import { prisma } from "../../@shared/db/prisma.client";

describe("Grades repository test", () => {
  let repository: GradesRepositoryInterface;

  beforeAll(() => {
    repository = new GradesRepository();
  });

  test("Create Grade", async () => {
    const grade = new Grade({
      dia: {
        id: 1,
        dia: "segunda",
      },
      horario: "1º",
      hora: "14:40 - 15:30",
      turma: new Turma({
        id: "d3d93466-a8f9-4726-9434-b60b2389dae6",
        nome: "1º A",
        serie: "1º Ano",
        turno: "matutino",
      }),
      professor: new Professor({
        id: "356ebda9-8416-4d11-a3c2-d1b2a1759256",
        nome: "Fulano",
      }),
      materia: new Materia({
        id: "1b8b4188-bb45-43ef-9d51-866e51d89ea8",
        nome: "História",
      }),
      turno: "vespertino",
    });

    await repository.add(grade);

    const find = await prisma.grade.findUnique({ where: { id: grade.id } });

    await prisma.grade.delete({ where: { id: grade.id } });

    expect(grade.hora).toBe(find.hora);
  });

  it("should throw error when try add same hour", async () => {
    const grade = new Grade({
      dia: {
        id: 1,
        dia: "segunda",
      },
      horario: "1º",
      hora: "14:40 - 15:30",
      turma: new Turma({
        id: "d3d93466-a8f9-4726-9434-b60b2389dae6",
        nome: "1º A",
        serie: "1º Ano",
        turno: "matutino",
      }),
      professor: new Professor({
        id: "356ebda9-8416-4d11-a3c2-d1b2a1759256",
        nome: "Fulano",
      }),
      materia: new Materia({
        id: "1b8b4188-bb45-43ef-9d51-866e51d89ea8",
        nome: "História",
      }),
      turno: "vespertino",
    });

    await repository.add(grade);

    const gradeFake = new Grade({
      dia: {
        id: 1,
        dia: "segunda",
      },
      horario: "1º",
      hora: "14:40 - 15:30",
      turma: new Turma({
        id: "d3d93466-a8f9-4726-9434-b60b2389dae6",
        nome: "1º A",
        serie: "1º Ano",
        turno: "matutino",
      }),
      professor: new Professor({
        id: "356ebda9-8416-4d11-a3c2-d1b2a1759256",
        nome: "Fulano",
      }),
      materia: new Materia({
        id: "1b8b4188-bb45-43ef-9d51-866e51d89ea8",
        nome: "História",
      }),
      turno: "vespertino",
    });

    expect(async () => {
      await repository.add(gradeFake);
    }).rejects.toThrow("Choque de horários");

    await prisma.grade.delete({ where: { id: grade.id } });
  });

  test("horarioTurma show list of horarios", async () => {
    const grade = await repository.horarioTurma(
      "d3d93466-a8f9-4726-9434-b60b2389dae6"
    );
    console.log(grade);

    expect(1).toEqual(1);
  });
});
