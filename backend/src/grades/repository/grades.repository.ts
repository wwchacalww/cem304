import { prisma } from "../../@shared/db/prisma.client";
import { Grade } from "../domain/entity/grade";
import { GradesRepositoryInterface } from "../domain/repository/grades-repository.interface";

export class GradesRepository implements GradesRepositoryInterface {
  async add(grade: Grade): Promise<void> {
    const checkHorario = await prisma.grade.findMany({
      where: {
        dia: grade.dia.id,
        hora: grade.hora,
        materia_id: grade.materia.id,
        turma_id: grade.turma.id,
        professor_id: grade.professor.id,
      },
    });

    if (checkHorario.length !== 0) {
      console.log("Já cadastrado");
    } else {
      await prisma.grade.create({
        data: {
          id: grade.id,
          dia: grade.dia.id,
          horario: grade.horario,
          hora: grade.hora,
          turno: grade.turno,
          materia_id: grade.materia.id,
          turma_id: grade.turma.id,
          professor_id: grade.professor.id,
        },
      });
    }
  }

  async horarioTurma(turma_id: string): Promise<Grade[]> {
    throw new Error("Method not implemented.");
  }
  async horarioProfessor(professor_id: string): Promise<Grade[]> {
    throw new Error("Method not implemented.");
  }
}
