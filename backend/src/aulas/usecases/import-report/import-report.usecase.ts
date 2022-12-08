import { Turma } from "@turmas/domain/entity/turma";
import { TurmasRepository } from "@turmas/repository/turmas.repository";
import { parse } from "csv-parse";
import { dataToDate, diaVO } from "@shared/value-objects/dia.vo";
import fs from "fs";
import { ProfessoresRepository } from "professores/repository/professores.repository";
import { Professor } from "professores/domain/entity/professor";
import { findProfessor } from "@@shared/utils/professor";
import { findTurma } from "@@shared/utils/turmas";
import { horarioVO } from "@@shared/utils/horario";
import { MateriasRepository } from "@materias/repository/materias.repository";
import { Materia } from "@materias/domain/entity/materia";
import { findMateria } from "@@shared/utils/materia";
import { Aula } from "aulas/domain/entity/aula";
import { AulasRepository } from "aulas/repository/aulas.repository";

export class ImportReportUsecase {
  loadClassrooms(
    file: Express.Multer.File,
    professores: Professor[],
    turmas: Turma[],
    materias: Materia[]
  ): Promise<Aula[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const aulas: any[] = [];

      const parseFile = parse({
        delimiter: ";",
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [data, turma_id, materia, nome_professor, hora, freq, reg] =
            line;
          const dia = dataToDate(data, hora);
          const grade = horarioVO(hora);
          let rf = 0;
          if (freq === "F" && reg !== "R") {
            rf = 1;
          }
          if (freq !== "F" && reg === "R") {
            rf = 2;
          }
          if (freq === "F" && reg === "R") {
            rf = 3;
          }

          aulas.push(
            new Aula({
              data: dia,
              turma: findTurma(turmas, turma_id),
              materia: findMateria({ materias, nome: materia }),
              professor: findProfessor({ professores, nome: nome_professor }),
              hora,
              horario: grade.horario,
              turno: grade.turno as any,
              rf,
            })
          );
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
    const repository = new AulasRepository();
    const aulas = await this.loadClassrooms(
      file,
      professores,
      turmas,
      materias
    );

    aulas.forEach(async (aula) => {
      try {
        await repository.add(aula);
      } catch (err: any) {
        console.log(err.message);
      }
    });
  }
}
