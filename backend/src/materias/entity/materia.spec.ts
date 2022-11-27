import { Professor } from "../../professores/entity/professor";
import { Turma } from "../../turmas/entity/turma";
import { Materia } from "./materia";

describe("Materia teste unitário", () => {
  it("criar um novo professor", () => {
    const materia = new Materia({
      nome: "História",
    });

    expect(materia.id).toBeDefined();
    expect(materia.nome).toBe("História");
  });
});

describe("Materia teste com enturmação e professores", () => {
  it("criar um novo professor", () => {
    const materia = new Materia({
      nome: "História",
    });

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

    materia.enturmar([turma_A, turma_B]);
    materia.contratar([professor]);

    professor.enturmar([turma_A, turma_B]);

    expect(materia.turmas.length).toEqual(2);
    expect(materia.professores.length).toEqual(1);
  });
});
