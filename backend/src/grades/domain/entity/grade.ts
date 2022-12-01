import { DiaDTO, TurnoDTO } from "@shared/dto";
import { Materia } from "../../../materias/domain/entity/materia";
import { Professor } from "professores/domain/entity/professor";
import { Turma } from "@turmas/domain/entity/turma";
import { v4 } from "uuid";

type GradeProps = {
  id?: string;
  dia: DiaDTO;
  horario: string;
  hora: string;
  turno: TurnoDTO;
  materia: Materia;
  professor: Professor;
  turma: Turma;
};

export class Grade {
  private _id: string;
  private _dia: DiaDTO;
  private _horario: string;
  private _hora: string;
  private _turno: TurnoDTO;
  private _materia: Materia;
  private _professor: Professor;
  private _turma: Turma;

  constructor({
    id,
    dia,
    horario,
    hora,
    turno,
    materia,
    professor,
    turma,
  }: GradeProps) {
    this._id = id || v4();
    this._dia = dia;
    this._horario = horario;
    this._hora = hora;
    this._turno = turno;
    this._materia = materia;
    this._turma = turma;
    this._professor = professor;
  }

  get id() {
    return this._id;
  }

  get dia() {
    return this._dia;
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

  toJSON() {
    return {
      id: this.id,
      dia: this.dia,
      horario: this.horario,
      hora: this.hora,
      turno: this.turno,
      materia: this.materia,
      turma: this.turma,
      professor: this.professor,
    };
  }
}
