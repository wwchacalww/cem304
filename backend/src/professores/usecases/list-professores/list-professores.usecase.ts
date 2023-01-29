import { ProfessoresRepository } from "professores/repository/professores.repository";

export class ListProfessoresUsecase {
  async execute() {
    const repository = new ProfessoresRepository();

    return await repository.list();
  }
}
