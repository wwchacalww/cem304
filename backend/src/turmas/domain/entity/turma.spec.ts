import { Materia } from "../../../materias/domain/entity/materia";
import { Professor } from "../../../professores/entity/professor";
import { Turma } from "./turma";

describe("Turma teste unitário", () => {
  it("criar uma nova turma", () => {
    const turma = new Turma({
      nome: "1º ano A - Matutino",
      serie: "1º Ano do Ensino Médio",
      turno: "matutino",
    });

    expect(turma.id).toBeDefined();
    expect(turma.nome).toBe("1º ano A - Matutino");
    expect(turma.turno).toBe("matutino");
    expect(turma.ano).toBe(new Date().getFullYear());
  });
});

describe("Turma teste com materias e professores", () => {
  it("criar uma nova turma e colocar professores e materia", () => {
    const historia = new Materia({
      nome: "História",
    });

    const sociologia = new Materia({
      nome: "Sociologia",
    });

    const professor = new Professor({
      nome: "Fulano",
    });

    const turma = new Turma({
      nome: "Turma A",
      serie: "1º Ano",
      turno: "matutino",
    });

    turma.registrar([historia, sociologia]);
    turma.contratar([professor]);

    expect(turma.materias.length).toEqual(2);
    expect(turma.professores.length).toEqual(1);
  });
});
