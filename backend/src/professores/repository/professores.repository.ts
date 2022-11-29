import { prisma } from "../../@shared/db/prisma.client";
import { Professor } from "../domain/entity/professor";
import { ProfessoresRepositoryInterface } from "../domain/repository/professores-repository.interface";

export class ProfessoresRepository implements ProfessoresRepositoryInterface {
  async add(professor: Professor): Promise<void> {
    await prisma.professor.create({
      data: {
        id: professor.id,
        nome: professor.nome,
      },
    });
  }

  async list(ano?: number): Promise<Professor[]> {
    const professores = await prisma.professor.findMany({});

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
}
