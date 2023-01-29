import { prisma } from "@@shared/db/prisma.client";
import { Agenda } from "../../domain/entity/agenda";
import { AgendasRepositoryInterface } from "../../domain/repository/agendas-repository.interface";

export class AgendasRepository implements AgendasRepositoryInterface {
  async add(agenda: Agenda): Promise<void> {
    const { id, mes, dia, nome, data, tipo } = agenda;
    await prisma.agendas.create({
      data: {
        id,
        mes,
        dia,
        data,
        nome,
        tipo,
      },
    });
  }
  list(ano: number): Promise<Agenda[]> {
    throw new Error("Method not implemented.");
  }
}
