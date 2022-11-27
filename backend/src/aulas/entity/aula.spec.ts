import { Materia } from "../../materias/entity/materia";
import { Professor } from "../../professores/entity/professor";
import { Turma } from "../../turmas/entity/turma";
import { Aula } from "./aula";

describe("Aula teste", () => {
  test("Criar uma aula", () => {
    const aula = new Aula({
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

    expect(aula.id).toBeDefined();
  });
});
