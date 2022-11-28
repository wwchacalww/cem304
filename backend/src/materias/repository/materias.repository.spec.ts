import { prisma } from "../../@shared/db/prisma.client";
import { Materia } from "../domain/entity/materia";
import { MateriasRepositoryInterface } from "../domain/repository/materias-repository.interface";
import { MateriasRepository } from "./materias.repository";

describe("Materias Repository test", () => {
  let repository: MateriasRepositoryInterface;

  beforeAll(() => {
    repository = new MateriasRepository();
  });

  test("Criar, listar e consultar materias", async () => {
    const historia = new Materia({ nome: "História", ano: 2022 });
    const matematica = new Materia({ nome: "Matemática", ano: 2022 });

    await repository.add(historia);
    await repository.add(matematica);

    const show = await repository.show(historia.id);
    const list = await repository.list(2022);

    expect(historia.nome).toBe(show.nome);
    expect(list.length).toEqual(2);

    await prisma.materia.deleteMany({
      where: {
        id: {
          in: [historia.id, matematica.id],
        },
      },
    });
  });
});
