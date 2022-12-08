import { Turma } from "@turmas/domain/entity/turma";
import { TurmasRepository } from "@turmas/repository/turmas.repository";
import { parse } from "csv-parse";
import { diaVO } from "@shared/value-objects/dia.vo";
import fs from "fs";
import { ProfessoresRepository } from "professores/repository/professores.repository";
import { Professor } from "professores/domain/entity/professor";
import { findProfessor } from "@@shared/utils/professor";
import { findTurma } from "@@shared/utils/turmas";
import { horarioVO } from "@@shared/utils/horario";
import { MateriasRepository } from "@materias/repository/materias.repository";
import { Materia } from "@materias/domain/entity/materia";
import { findMateria } from "@@shared/utils/materia";
import { Grade } from "grades/domain/entity/grade";
import { GradesRepository } from "grades/repository/grades.repository";

export class CheckImportUsecase {
  loadClassrooms(
    file: Express.Multer.File,
    professores: Professor[],
    turmas: Turma[],
    materias: Materia[]
  ): Promise<Grade[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const checkImport: any[] = [];
      const checkGrade: string[] = [];

      const parseFile = parse({
        delimiter: ";",
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          if (line.length < 7) {
            console.log(line);
          }
          const [data, turma_id, materia, nome_professor, hora] = line;
          const dia = diaVO({ dia_texto: data });
          const grade = horarioVO(hora);
          const chave = `${dia.dia} + ${grade.horario} + ${nome_professor}`;

          try {
            findMateria({ materias, nome: materia });
          } catch (err: any) {
            checkImport.push(materia);
          }

          try {
            findProfessor({ professores, nome: nome_professor });
          } catch (err: any) {
            checkImport.push(nome_professor);
          }
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(checkImport);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    const professoresRepository = new ProfessoresRepository();
    const turmasRepository = new TurmasRepository();
    const materiasRepository = new MateriasRepository();
    const professores = await professoresRepository.list(2022);
    const turmas = await turmasRepository.list(2022);
    const materias = await materiasRepository.list(2022);
    const grades = await this.loadClassrooms(
      file,
      professores,
      turmas,
      materias
    );

    return grades;
  }
}
