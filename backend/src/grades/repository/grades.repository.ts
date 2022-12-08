import { findMateria } from "../../@shared/utils/materia";
import { findProfessor } from "../../@shared/utils/professor";
import { findTurma } from "../../@shared/utils/turmas";
import { diaVO } from "../../@shared/value-objects/dia.vo";
import { Materia } from "../../materias/domain/entity/materia";
import { Turma } from "../../turmas/domain/entity/turma";
import { Professor } from "../../professores/domain/entity/professor";
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
    const findTurmas = await prisma.turma.findMany();
    const turmas = findTurmas.map((turma) => {
      const { id, nome, serie, ano, turno } = turma as Turma;
      return new Turma({
        id,
        nome,
        serie,
        ano,
        turno,
      });
    });

    const findMaterias = await prisma.materia.findMany();
    const materias = findMaterias.map((materia) => {
      const { id, nome, ano } = materia;
      return new Materia({
        id,
        nome,
        ano,
      });
    });

    const findProfessores = await prisma.professor.findMany();
    const professores = findProfessores.map((professor) => {
      const { id, nome } = professor;
      return new Professor({
        id,
        nome,
      });
    });

    const aulas = await prisma.grade.findMany({
      where: {
        turma_id,
      },
      orderBy: {
        dia: "asc",
      },
    });
    if (aulas.length === 0) {
      throw new Error("Informe uma turma correta");
    }

    return aulas.map((aula) => {
      return new Grade({
        id: aula.id,
        dia: diaVO({ dia_numero: aula.dia }),
        hora: aula.hora,
        horario: aula.horario,
        turno: aula.turno as any,
        turma: findTurma(turmas, aula.turma_id),
        materia: findMateria({ materias, id: aula.materia_id }),
        professor: findProfessor({ professores, id: aula.professor_id }),
      });
    });
  }
  async horarioProfessor(professor_id: string): Promise<Grade[]> {
    throw new Error("Method not implemented.");
  }

  async horarioProfessorTurma(
    professor_id: string,
    turma_id: string
  ): Promise<Grade[]> {
    const findTurmas = await prisma.turma.findMany();
    const turmas = findTurmas.map((turma) => {
      const { id, nome, serie, ano, turno } = turma as Turma;
      return new Turma({
        id,
        nome,
        serie,
        ano,
        turno,
      });
    });

    const findMaterias = await prisma.materia.findMany();
    const materias = findMaterias.map((materia) => {
      const { id, nome, ano } = materia;
      return new Materia({
        id,
        nome,
        ano,
      });
    });

    const findProfessores = await prisma.professor.findMany();
    const professores = findProfessores.map((professor) => {
      const { id, nome } = professor;
      return new Professor({
        id,
        nome,
      });
    });

    const aulas = await prisma.grade.findMany({
      where: {
        professor_id,
        turma_id,
      },
    });
    if (aulas.length === 0) {
      throw new Error("Turma ou professor incorreto");
    }

    return aulas.map((aula) => {
      return new Grade({
        id: aula.id,
        dia: diaVO({ dia_numero: aula.dia }),
        hora: aula.hora,
        horario: aula.horario,
        turno: aula.turno as any,
        turma: findTurma(turmas, aula.turma_id),
        materia: findMateria({ materias, id: aula.materia_id }),
        professor: findProfessor({ professores, id: aula.professor_id }),
      });
    });
  }
}
