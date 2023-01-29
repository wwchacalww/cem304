import { Agenda } from "./agenda";

describe("Agenda Entity Test", () => {
  it("create a new agenda", () => {
    const agenda = new Agenda({
      mes: 4,
      dia: 21,
      data: new Date("2022-04-21 10:00:00"),
      nome: "Aniversário de Brasília e Incofidência Mineira",
      tipo: "Feriado",
    });

    expect(agenda.id).toBeDefined();
    expect(agenda.tipo).toBe("Feriado");
  });
});
