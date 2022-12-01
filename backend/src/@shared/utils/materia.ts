import { Materia } from "materias/domain/entity/materia";

type FindMateriaDTO = {
  materias: Materia[];
  nome?: string;
  id?: string;
};
export function findMateria({ materias, nome, id }: FindMateriaDTO): Materia {
  if (id) {
    const materia = materias.find((materia) => materia.id === id);
    return materia;
  } else if (nome) {
    const materia = materias.find(
      (materia) => materia.nome.toUpperCase() === nome.toUpperCase()
    );
    return materia;
  } else {
    throw new Error("Informe um id ou nome");
  }
}
