import { Grade } from "../entity/grade";

export interface GradesRepositoryInterface {
  add(grade: Grade): Promise<void>;
  horarioTurma(turma_id: string): Promise<Grade[]>;
  horarioProfessor(professor_id: string): Promise<Grade[]>;
  horarioProfessorTurma(
    professor_id: string,
    turma_id: string
  ): Promise<Grade[]>;
}
