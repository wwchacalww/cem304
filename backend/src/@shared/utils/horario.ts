export function horarioVO(hora: string) {
  switch (hora) {
    case "13:00 - 13:50":
      return { hora, horario: "1º", turno: "vespertino" };

    case "13:50 - 14:40":
      return { hora, horario: "2º", turno: "vespertino" };

    case "14:40 - 15:30":
      return { hora, horario: "3º", turno: "vespertino" };

    case "15:45 - 16:35":
      return { hora, horario: "4º", turno: "vespertino" };

    case "16:35 - 17:25":
      return { hora, horario: "5º", turno: "vespertino" };

    case "17:25 - 18:15":
      return { hora, horario: "6º", turno: "vespertino" };

    default:
      return null;
  }
}

type InputCheckDaysOnYear = {
  days: number[];
  period: {
    in: Date;
    out: Date;
  };
};

export function checkDaysOnYear({ days, period }: InputCheckDaysOnYear) {
  const firstDay = period.in.getTime();
  const lastDay = period.out.getTime();

  const dates: Date[] = [];
  let n = 0;
  for (let i = firstDay; i <= lastDay; i = i + 86400000) {
    const day = new Date(i);
    if (days.includes(day.getDay())) {
      dates.push(day);
    }
  }

  return dates;
}
