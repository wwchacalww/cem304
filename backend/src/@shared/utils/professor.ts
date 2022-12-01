import { Professor } from "professores/domain/entity/professor";

export function findProfessor(
  professores: Professor[],
  nome: string
): Professor {
  const professor = professores.find(
    (professor) => professor.nome.toUpperCase() === nome.toUpperCase()
  );
  return professor;
}
