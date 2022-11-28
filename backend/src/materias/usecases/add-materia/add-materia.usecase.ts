import { InputAddMateria } from "@@shared/dto";
import { Materia } from "@materias/domain/entity/materia";
import { MateriasRepository } from "@materias/repository/materias.repository";

export class AddMateriaUsecase {
  async execute({ nome, ano = new Date().getFullYear() }: InputAddMateria) {
    const materia = new Materia({
      nome,
      ano,
    });
    const repository = new MateriasRepository();
    await repository.add(materia);
    return materia;
  }
}
