import { prisma } from "../../@shared/db/prisma.client";
import { Aula } from "aulas/domain/entity/aula";
import {
  AulasRepositoryInterface,
  InputListRF,
} from "aulas/domain/repository/aulas-repository.interface";

export class AulasRepository implements AulasRepositoryInterface {
  async add(aula: Aula): Promise<void> {
    const checkHorario = await prisma.aulas.findMany({
      where: {
        data: aula.data,
        hora: aula.hora,
        materia_id: aula.materia.id,
        turma_id: aula.turma.id,
        professor_id: aula.professor.id,
      },
    });

    if (checkHorario.length === 0) {
      try {
        await prisma.aulas.create({
          data: {
            id: aula.id,
            data: aula.data,
            horario: aula.horario,
            hora: aula.hora,
            turno: aula.turno,
            materia_id: aula.materia.id,
            turma_id: aula.turma.id,
            professor_id: aula.professor.id,
            rf: aula.rf,
          },
        });
      } catch (err: any) {
        console.log(err.message);
      }
    }
  }

  async listRF({ professor_id, period }: InputListRF): Promise<any[]> {
    const aulas = await prisma.aulas.findMany({
      where: {
        professor_id,
        data: {
          gte: period.in,
          lte: period.out,
        },
      },
      include: {
        turma: true,
      },
      orderBy: {
        data: "asc",
      },
    });

    return aulas;
  }
}
