import { v4 } from "uuid";

type AgendaProps = {
  id?: string;
  mes: number;
  dia: number;
  data: Date;
  nome: string;
  tipo: string;
};

export class Agenda {
  private _id: string;
  private _mes: number;
  private _dia: number;
  private _data: Date;
  private _nome: string;
  private _tipo: string;

  constructor({ id, mes, dia, data, nome, tipo }: AgendaProps) {
    this._id = id || v4();
    this._mes = mes;
    this._dia = dia;
    this._data = data;
    this._nome = nome;
    this._tipo = tipo;
  }

  get id() {
    return this._id;
  }

  get mes() {
    return this._mes;
  }

  get dia() {
    return this._dia;
  }

  get data() {
    return this._data;
  }

  get nome() {
    return this._nome;
  }

  get tipo() {
    return this._tipo;
  }

  toJSON() {
    return {
      id: this.id,
      mes: this.mes,
      dia: this.dia,
      data: this.data,
      nome: this.nome,
      tipo: this.tipo,
    };
  }
}
