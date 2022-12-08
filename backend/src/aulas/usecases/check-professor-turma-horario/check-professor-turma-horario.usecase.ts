import { GradesRepository } from "../../repository/grades.repository";
import { checkDaysOnYear } from "../../../@shared/utils/horario";

type Props = {
  professor_id: string;
  turma_id: string;
  period: {
    in: Date;
    out: Date;
  };
};

export class CheckProfessorTurmaHorario {
  async execute({ professor_id, turma_id, period }: Props) {
    const repository = new GradesRepository();
    const aulas = await repository.horarioProfessorTurma(
      professor_id,
      turma_id
    );

    const days: number[] = [];

    aulas.forEach((aula) => {
      days.push(aula.dia.id);
    });
    const dias = checkDaysOnYear({
      days,
      period,
    });

    return dias.map((date) => {
      return new Intl.DateTimeFormat("pt-BR").format(date);
    });
  }
}
