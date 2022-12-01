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

export class ImportReportUsecase {
  loadClassrooms(
    file: Express.Multer.File,
    professores: Professor[],
    turmas: Turma[],
    materias: Materia[]
  ) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const aulas: any[] = [];
      const checkGrade: string[] = [];

      const parseFile = parse({
        delimiter: ";",
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [data, turma_id, materia_id, nome_professor, hora] = line;
          const dia = diaVO({ dia_texto: data });
          const grade = horarioVO(hora);
          const chave = dia + grade.horario + nome_professor;

          if (checkGrade.indexOf(chave) === -1) {
            aulas.push(
              new Grade({
                dia,
                turma: findTurma(turmas, turma_id),
                materia: findMateria({ materias, id: materia_id }),
                professor: findProfessor(professores, nome_professor),
                hora,
                horario: grade.horario,
                turno: grade.turno as any,
              })
            );
            checkGrade.push(chave);
          }
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(aulas);
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
    const repository = new GradesRepository();
    const grades = (await this.loadClassrooms(
      file,
      professores,
      turmas,
      materias
    )) as any[];

    grades.forEach(async (grade) => {
      try {
        await repository.add(grade);
      } catch (err: any) {
        console.log(err.message);
      }
    });
  }
}
