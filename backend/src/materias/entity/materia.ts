import { Professor } from "professores/entity/professor";
import { Turma } from "turmas/entity/turma";
import { v4 } from "uuid";

type MateriaProps = {
  id?: string;
  nome: string;
};

export class Materia {
  private _id: string;
  private _nome: string;
  private _turmas?: Turma[];
  private _professores?: Professor[];

  constructor({ id, nome }: MateriaProps) {
    this._id = id || v4();
    this._nome = nome;
    this._turmas = [];
    this._professores = [];
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

  get professores() {
    return this._professores;
  }

  contratar(professores: Professor[]) {
    professores.forEach((professor) => {
      this._professores.push(professor);
    });
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      professores: this._professores.map((professor) => {
        return {
          id: professor.id,
          nome: professor.nome,
        };
      }),
      turmas: this._turmas.map((turma) => {
        return {
          id: turma.id,
          nome: turma.nome,
          serie: turma.serie,
          turno: turma.turno,
        };
      }),
    };
  }
}
