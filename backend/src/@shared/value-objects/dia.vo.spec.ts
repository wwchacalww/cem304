import { diaVO } from "./dia.vo";

describe("Teste diaVO", () => {
  test("diaVO", () => {
    const dia = diaVO({ dia_numero: 5 });
    expect(dia).toStrictEqual({
      id: 5,
      dia: "sexta",
    });
    const data = diaVO({ data: new Date("2022-11-25 10:37:00") });
    expect(data).toStrictEqual({
      id: 5,
      dia: "sexta",
    });
    const timestamp = diaVO({ timestamp: 1668956400000 });
    expect(timestamp).toStrictEqual({
      id: 0,
      dia: "domingo",
    });

    const data_texto = diaVO({ dia_texto: "20/11/2022" });
    expect(data_texto).toStrictEqual({
      id: 0,
      dia: "domingo",
    });
  });
});
