import { ProfessoresRepository } from "professores/repository/professores.repository";

export class EnturmarUsecase {
  async execute(professor_id: string, turma_id: string) {
    const repository = new ProfessoresRepository();
    const professor = await repository.enturmar(professor_id, turma_id);
    return professor;
  }
}
