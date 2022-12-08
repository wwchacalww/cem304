import { GradesRepository } from "../../repository/grades.repository";
import { checkDaysOnYear } from "../../../@shared/utils/horario";
import { AulasRepository } from "../../../aulas/repository/aulas.repository";

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
    const aulasRepository = new AulasRepository();
    const aulas = await repository.horarioProfessorTurma(
      professor_id,
      turma_id
    );

    const aulasDadas = await aulasRepository.listRF({
      professor_id,
      turma_id,
      period,
    });

    const daysCompleted = aulasDadas.map((aula) => {
      if (aula.rf > 0) {
        return new Intl.DateTimeFormat("pt-BR").format(aula.data);
      }
    });

    console.log(daysCompleted);

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
