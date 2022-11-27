import { Materia } from "materias/entity/materia";
import { Turma } from "turmas/entity/turma";
import { v4 } from "uuid";

type ProfessorProps = {
  id?: string;
  nome: string;
};

export class Professor {
  private _id: string;
  private _nome: string;
  private _turmas?: Turma[];
  private _materias?: Materia[];

  constructor({ id, nome }: ProfessorProps) {
    this._id = id || v4();
    this._nome = nome;
    this._turmas = [];
    this._materias = [];
  }

  get id() {
    return this._id;
  }

  get nome() {
    return this._nome;
  }

  get turmas() {
    return this._turmas;
  }

  enturmar(turmas: Turma[]) {
    turmas.forEach((turma) => {
      this._turmas.push(turma);
    });
  }

  get materias() {
    return this._materias;
  }

  registar(materias: Materia[]) {
    materias.forEach((materia) => {
      this._materias.push(materia);
    });
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      turmas: this._turmas.map((turma) => {
        return {
          id: turma.id,
          nome: turma.nome,
          serie: turma.serie,
          turno: turma.turno,
        };
      }),
      materias: this._materias.map((materia) => {
        return {
          id: materia.id,
          nome: materia.nome,
        };
      }),
    };
  }
}
