import { Materia } from "../entity/materia";

export interface MateriasRepositoryInterface {
  add(materia: Materia): Promise<void>;
  list(ano?: number): Promise<Materia[]>;
  show(id: string): Promise<Materia>;
}
