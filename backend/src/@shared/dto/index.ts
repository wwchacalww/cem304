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

export { DiaDTO, TurnoDTO, InputAddTurma, InputAddMateria };
