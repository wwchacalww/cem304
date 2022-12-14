type DiaProps = {
  dia_numero?: number;
  data?: Date;
  timestamp?: number;
  dia_texto?: string;
};

export const diaVO = ({ dia_numero, data, timestamp, dia_texto }: DiaProps) => {
  if (dia_numero) {
    return qualDia(dia_numero);
  }

  if (data) {
    return qualDia(data.getDay());
  }

  if (timestamp) {
    const dia = new Date(timestamp);
    return qualDia(dia.getDay());
  }

  if (dia_texto) {
    const dmy = dia_texto.split("/");
    const dia = new Date(`${dmy[2]}-${dmy[1]}-${dmy[0]} 12:00:00`);
    return qualDia(dia.getDay());
  }

  throw new Error("Informe uma data");
};

export function dataToDate(data: string, hora: string) {
  const dmy = data.split("/");
  const hr = hora.split(" - ");
  const h = hr[0].split(":");
  const dia = new Date(
    Number(dmy[2]),
    Number(dmy[1]) - 1,
    Number(dmy[0]),
    Number(h[0]),
    Number(h[1]),
    0
  );
  return dia;
}

function qualDia(dia_numero: number) {
  switch (dia_numero) {
    case 0:
      return { id: 0, dia: "domingo" };
    case 1:
      return { id: 1, dia: "segunda" };
    case 2:
      return { id: 2, dia: "terça" };
    case 3:
      return { id: 3, dia: "quarta" };
    case 4:
      return { id: 4, dia: "quinta" };
    case 5:
      return { id: 5, dia: "sexta" };
    case 6:
      return { id: 6, dia: "sábado" };
    default:
      return { id: 6, dia: "sábado" };
  }
}
