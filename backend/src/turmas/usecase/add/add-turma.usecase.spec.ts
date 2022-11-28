import { prisma } from "../../../@shared/db/prisma.client";
import { AddTurmaUsecase } from "./add-turma.usecase";

describe("AddTurmaUsecase test", () => {
  test("Criar turma", async () => {
    const usecase = new AddTurmaUsecase();
    const turma = await usecase.execute({
      nome: "1º ano A - Matutino",
      serie: "1º ano Ensino Médio",
      turno: "matutino",
      ano: 2022,
    });

    const find = await prisma.turma.findUnique({
      where: { id: turma.id },
    });

    expect(find.id).toBe(turma.id);
    expect(find.nome).toBe(turma.nome);

    await prisma.turma.delete({
      where: {
        id: turma.id,
      },
    });
  });
});
