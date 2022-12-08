import { Professor } from "professores/domain/entity/professor";

type FindProfessorType = {
  professores: Professor[];
  nome?: string;
  id?: string;
};
export function findProfessor({
  professores,
  nome,
  id,
}: FindProfessorType): Professor {
  if (id) {
    const professor = professores.find((professor) => professor.id === id);
    return professor;
  } else if (nome) {
    const professor = professores.find(
      (professor) => professor.nome.toUpperCase() === nome.toUpperCase()
    );
    return professor;
  } else {
    throw new Error("Informe um id ou nome");
  }
}
