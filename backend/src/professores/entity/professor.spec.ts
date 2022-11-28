import { Materia } from "../../materias/entity/materia";
import { Turma } from "../../turmas/domain/entity/turma";
import { Professor } from "./professor";

describe("Professor teste unitário", () => {
  it("criar um novo professor", () => {
    const professor = new Professor({
      nome: "Fulano",
    });

    expect(professor.id).toBeDefined();
    expect(professor.nome).toBe("Fulano");
  });
});

describe("Professor teste com enturmação", () => {
  it("criar um novo professor", () => {
    const professor = new Professor({
      nome: "Fulano",
    });

    const turma_A = new Turma({
      nome: "Turma A",
      serie: "1º Ano",
      turno: "matutino",
    });

    const turma_B = new Turma({
      nome: "Turma B",
      serie: "2º Ano",
      turno: "vespertino",
    });

    const historia = new Materia({
      nome: "História",
    });

    professor.enturmar([turma_A, turma_B]);
    professor.registar([historia]);

    expect(professor.turmas.length).toEqual(2);
    expect(professor.materias.length).toEqual(1);
  });
});
