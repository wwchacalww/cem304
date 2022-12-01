import { Turma } from "turmas/domain/entity/turma";

export function findTurma(turmas: Turma[], id: string): Turma {
  const turma = turmas.find((turma) => turma.id === id);
  return turma;
}
