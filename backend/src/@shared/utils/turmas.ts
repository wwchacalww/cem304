import { Turma } from "turmas/domain/entity/turma";

export function findTurma(turmas: Turma[], nome: string): Turma {
  const nm = nome.split(" ");
  const turno = {
    title: nm[4] === "VESPERTINO" ? "Vespertino" : "Matutino",
    turno: nm[4].toLowerCase(),
  };
  const slug = `${nm[3].substring(1, 0)}º ano ${nm[3].substring(1)} - ${
    turno.title
  }`;

  const turma = turmas.find((turma) => turma.nome === slug);

  if (!turma) {
    return new Turma({
      nome: slug,
      serie: `${nm[3].substring(1, 0)} ano do Ensino Médio`,
      turno: turno.turno === "vespertino" ? "vespertino" : "matutino",
      ano: 2022,
    });
  }
  return turma;
}
