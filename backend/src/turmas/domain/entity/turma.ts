import { TurnoDTO } from "@shared/dto";
import { Materia } from "materias/entity/materia";
import { Professor } from "professores/entity/professor";
import { v4 } from "uuid";

type TurmaProps = {
  id?: string;
  nome: string;
  serie: string;
  turno: TurnoDTO;
  ano?: number;
};

export class Turma {
  private _id: string;
  private _nome: string;
  private _serie: string;
  private _turno: TurnoDTO;
  private _professores?: Professor[];
  private _materias?: Materia[];
  private _ano: number;

  constructor({ id, nome, serie, turno, ano }: TurmaProps) {
    this._id = id || v4();
    this._nome = nome;
    this._serie = serie;
    this._turno = turno;
    this._professores = [];
    this._materias = [];
    this._ano = ano || new Date().getFullYear();
  }

  get id() {
    return this._id;
  }

  get nome() {
    return this._nome;
  }

  get serie() {
    return this._serie;
  }

  get turno() {
    return this._turno;
  }

  get professores() {
    return this._professores;
  }

  get ano() {
    return this._ano;
  }

  contratar(professores: Professor[]) {
    professores.forEach((professor) => {
      this._professores.push(professor);
    });
  }

  get materias() {
    return this._materias;
  }

  registrar(materias: Materia[]) {
    materias.forEach((materia) => {
      this.materias.push(materia);
    });
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      serie: this.serie,
      turno: this.turno,
      ano: this.ano,
      professores: this._professores.map((professor) => {
        return {
          id: professor.id,
          name: professor.nome,
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
