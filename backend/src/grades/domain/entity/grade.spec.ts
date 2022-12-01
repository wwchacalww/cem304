import { Materia } from "../../../materias/domain/entity/materia";
import { Professor } from "../../../professores/domain/entity/professor";
import { Turma } from "../../../turmas/domain/entity/turma";
import { Grade } from "./grade";

describe("Grade teste", () => {
  test("Criar uma Grade", () => {
    const grade = new Grade({
      dia: {
        id: 1,
        dia: "segunda",
      },
      horario: "1º",
      hora: "14:40 - 15:30",
      turma: new Turma({ nome: "1º A", serie: "1º Ano", turno: "matutino" }),
      professor: new Professor({ nome: "Fulano" }),
      materia: new Materia({ nome: "História" }),
      turno: "matutino",
    });

    expect(grade.id).toBeDefined();
  });
});
