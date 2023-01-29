import { Turma } from "../../turmas/domain/entity/turma";
import { prisma } from "../../@shared/db/prisma.client";
import { Professor } from "../domain/entity/professor";
import { ProfessoresRepositoryInterface } from "../domain/repository/professores-repository.interface";
import { Materia } from "../../materias/domain/entity/materia";

export class ProfessoresRepository implements ProfessoresRepositoryInterface {
  async add(professor: Professor): Promise<void> {
    const chkPro = await prisma.professor.findFirst({
      where: {
        nome: professor.nome,
      },
    });

    if (!chkPro) {
      await prisma.professor.create({
        data: {
          id: professor.id,
          nome: professor.nome,
        },
      });
    }
  }

  async list(ano?: number): Promise<Professor[]> {
    const professores = await prisma.professor.findMany({
      orderBy: {
        nome: "asc",
      },
    });

    return professores.map((professor) => {
      const { id, nome } = professor;
      return new Professor({
        id,
        nome,
      });
    });
  }

  async show(id: string): Promise<Professor> {
    const professor = await prisma.professor.findUnique({ where: { id } });
    if (!professor) {
      throw new Error("Professor não encontrado");
    }

    return new Professor({
      id,
      nome: professor.nome,
    });
  }

  async enturmar(professor_id: string, turma_id: string): Promise<Professor> {
    await prisma.professoresOnTurmas.create({
      data: {
        professor_id,
        turma_id,
      },
    });

    const find = await prisma.professor.findUnique({
      where: { id: professor_id },
      include: {
        turmas: {
          include: { turma: true },
        },
      },
    });

    const professor = new Professor({
      id: professor_id,
      nome: find.nome,
    });

    const turmas = find.turmas.map((turma) => {
      const { id, nome, serie, ano, turno } = turma.turma as Turma;
      return new Turma({
        id,
        nome,
        serie,
        turno,
        ano,
      });
    });

    professor.enturmar(turmas);

    return professor;
  }

  async disciplinar(
    materia_id: string,
    professor_id: string
  ): Promise<Professor> {
    await prisma.materiasOnProfessores.create({
      data: {
        materia_id,
        professor_id,
      },
    });

    const find = await prisma.professor.findUnique({
      where: { id: professor_id },
      include: {
        MateriasOnProfessores: {
          include: { materia: true },
        },
      },
    });

    const professor = new Professor({
      id: professor_id,
      nome: find.nome,
    });

    const materias = find.MateriasOnProfessores.map((materia) => {
      const { id, nome, ano } = materia.materia;
      return new Materia({
        id,
        nome,
        ano,
      });
    });

    professor.registar(materias);

    return professor;
  }
}
