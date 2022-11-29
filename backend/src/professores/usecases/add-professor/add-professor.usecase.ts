import { ProfessoresRepository } from "../../repository/professores.repository";
import { Professor } from "../../domain/entity/professor";

export class AddProfessorUsecase {
  async execute(nome: string) {
    const professor = new Professor({
      nome,
    });
    const repository = new ProfessoresRepository();
    await repository.add(professor);
    return professor;
  }
}
