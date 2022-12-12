import { prisma } from "../../@shared/db/prisma.client";
import { Turma } from "../domain/entity/turma";
import { TurmaRepositoryInterface } from "@turmas/domain/repository/turmas-repository.interface";

export class TurmasRepository implements TurmaRepositoryInterface {
  async add(turma: Turma): Promise<void> {
    const find = await prisma.turma.findFirst({
      where: {
        nome: turma.nome,
        ano: turma.ano,
      },
    });

    if (!find) {
      await prisma.turma.create({
        data: {
          id: turma.id,
          nome: turma.nome,
          serie: turma.serie,
          turno: turma.turno,
          ano: turma.ano,
        },
      });
    }
  }

  async list(ano: number): Promise<Turma[]> {
    const result = await prisma.turma.findMany({
      where: {
        ano,
      },
      orderBy: {
        nome: "asc",
      },
    });

    if (!result) {
      throw new Error("Turmas não encontradas");
    }

    return result.map((turma) => {
      const { id, nome, turno, serie, ano } = turma as Turma;
      return new Turma({
        id,
        nome,
        turno,
        serie,
        ano,
      });
    });
  }

  async show(turma_id: string): Promise<Turma> {
    const turma = (await prisma.turma.findUnique({
      where: {
        id: turma_id,
      },
    })) as Turma;

    if (!turma) {
      throw new Error("Turma não encontrada");
    }

    return new Turma({
      id: turma.id,
      nome: turma.nome,
      serie: turma.serie,
      turno: turma.turno,
      ano: turma.ano,
    });
  }
}
