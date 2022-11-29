import { Professor } from "../entity/professor";

export interface ProfessoresRepositoryInterface {
  add(professor: Professor): Promise<void>;
  list(ano?: number): Promise<Professor[]>;
  show(id: string): Promise<Professor>;
}
