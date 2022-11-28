import { InputAddTurma } from "../../../@shared/dto";
import { Turma } from "../../domain/entity/turma";
import { TurmasRepository } from "../../repository/turmas.repository";

export class AddTurmaUsecase {
  async execute({ nome, serie, ano, turno }: InputAddTurma) {
    const entity = new Turma({
      nome,
      serie,
      turno,
      ano,
    });

    const repository = new TurmasRepository();

    await repository.add(entity);

    return entity;
  }
}
