import { CheckProfessorTurmaHorario } from "./check-professor-turma-horario.usecase";

describe("Teste usecase", () => {
  test("Read date", async () => {
    const usecase = new CheckProfessorTurmaHorario();

    const data = await usecase.execute({
      professor_id: "c4058776-805f-4211-a29f-ca926a5519a8",
      turma_id: "d3d93466-a8f9-4726-9434-b60b2389dae6",
      period: {
        in: new Date("2022-04-01 00:00:00"),
        out: new Date("2022-06-30 00:00:00"),
      },
    });

    console.log(data);
  });
});
