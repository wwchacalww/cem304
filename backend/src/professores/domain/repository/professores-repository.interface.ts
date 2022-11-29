import { Professor } from "../entity/professor";

export interface ProfessoresRepositoryInterface {
  add(professor: Professor): Promise<void>;
  list(ano?: number): Promise<Professor[]>;
  show(id: string): Promise<Professor>;
  enturmar(professor_id: string, turma_id: string): Promise<Professor>;
  disciplinar(materia_id: string, professor_id: string): Promise<Professor>;
}
