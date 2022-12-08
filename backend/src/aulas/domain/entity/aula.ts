import { TurnoDTO } from "@shared/dto";
import { Materia } from "../../../materias/domain/entity/materia";
import { Professor } from "professores/domain/entity/professor";
import { Turma } from "@turmas/domain/entity/turma";
import { v4 } from "uuid";

type GradeProps = {
  id?: string;
  data: Date;
  horario: string;
  hora: string;
  turno: TurnoDTO;
  materia: Materia;
  professor: Professor;
  turma: Turma;
  rf: number; // 0 = null; 1=F; 2=R; 3=RF
};

export class Aula {
  private _id: string;
  private _data: Date;
  private _horario: string;
  private _hora: string;
  private _turno: TurnoDTO;
  private _materia: Materia;
  private _professor: Professor;
  private _turma: Turma;
  private _rf: number;

  constructor({
    id,
    data,
    horario,
    hora,
    turno,
    materia,
    professor,
    turma,
    rf,
  }: GradeProps) {
    this._id = id || v4();
    this._data = data;
    this._horario = horario;
    this._hora = hora;
    this._turno = turno;
    this._materia = materia;
    this._turma = turma;
    this._professor = professor;
    this._rf = rf;
  }

  get id() {
    return this._id;
  }

  get data() {
    return this._data;
  }

  get horario() {
    return this._horario;
  }

  get hora() {
    return this._hora;
  }

  get turno() {
    return this._turno;
  }

  get materia() {
    return this._materia;
  }

  get turma() {
    return this._turma;
  }

  get professor() {
    return this._professor;
  }

  get rf() {
    return this._rf;
  }

  toJSON() {
    return {
      id: this.id,
      data: this.data,
      horario: this.horario,
      hora: this.hora,
      turno: this.turno,
      materia: this.materia,
      turma: this.turma,
      professor: this.professor,
    };
  }
}
