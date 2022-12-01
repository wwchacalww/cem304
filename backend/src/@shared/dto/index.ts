type DiaDTO = {
  id: number;
  dia: string;
};

type TurnoDTO = "matutino" | "vespertino" | "nortuno";

type InputAddTurma = {
  nome: string;
  serie: string;
  turno: TurnoDTO;
  ano: number;
};

type InputAddMateria = {
  id?: string;
  nome: string;
  ano?: number;
};

type InputAddAula = {
  dia: DiaDTO;
  horario: string;
  hora: string;
  turno: TurnoDTO;
  materia_id: string;
  professor_nome: string;
  turma_id: string;
};

export { DiaDTO, TurnoDTO, InputAddTurma, InputAddMateria, InputAddAula };
