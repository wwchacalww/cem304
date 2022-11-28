import { prisma } from "../../@shared/db/prisma.client";
import { Materia } from "../domain/entity/materia";
import { MateriasRepositoryInterface } from "../domain/repository/materias-repository.interface";

export class MateriasRepository implements MateriasRepositoryInterface {
  async add(materia: Materia): Promise<void> {
    await prisma.materia.create({
      data: {
        id: materia.id,
        nome: materia.nome,
        ano: materia.ano,
      },
    });
  }

  async list(ano?: number): Promise<Materia[]> {
    const materias = await prisma.materia.findMany({
      where: {
        ano: ano || new Date().getFullYear(),
      },
    });

    return materias.map((materia) => {
      const { id, nome, ano } = materia;
      return new Materia({
        id,
        nome,
        ano,
      });
    });
  }

  async show(id: string): Promise<Materia> {
    const materia = await prisma.materia.findUnique({
      where: { id },
    });

    if (!materia) {
      throw new Error("Materia não encontrada");
    }

    return new Materia({
      id: materia.id,
      nome: materia.nome,
      ano: materia.ano,
    });
  }
}
