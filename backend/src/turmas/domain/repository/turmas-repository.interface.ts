import { Turma } from "../entity/turma";

export interface TurmaRepositoryInterface {
  add(turma: Turma): Promise<void>;
  list(ano: number): Promise<Turma[]>;
  show(turma_id: string): Promise<Turma>;
}
