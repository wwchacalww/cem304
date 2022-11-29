import { ProfessoresRepository } from "professores/repository/professores.repository";

export class DisciplinarUsecase {
  async execute(materia_id: string, professor_id: string) {
    const repository = new ProfessoresRepository();
    const professor = await repository.disciplinar(materia_id, professor_id);
    return professor;
  }
}
