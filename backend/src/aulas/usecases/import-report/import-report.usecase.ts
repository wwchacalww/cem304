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
    const professoresRepository = new ProfessoresRepository();
    const materiasRepository = new MateriasRepository();
    const repository = new AulasRepository();

    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const aulas: any[] = [];

      const parseFile = parse({
        delimiter: ";",
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [data, turma, nome_materia, nome_professor, hora, freq, reg] =
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

          const professor = findProfessor({
            professores,
            nome: nome_professor,
          });

          const checkProfessor = professores.find((p) => p.id === professor.id);
          if (!checkProfessor) {
            professores.push(professor);
            await professoresRepository.add(professor);
          }

          const materia = findMateria({
            materias,
            nome: nome_materia,
          });

          const checkMateria = materias.find((m) => m.id === materia.id);
          if (!checkMateria) {
            materias.push(materia);
            await materiasRepository.add(materia);
          }

          const aula = new Aula({
            data: dia,
            turma: findTurma(turmas, turma),
            materia,
            professor,
            hora,
            horario: grade.horario,
            turno: grade.turno as any,
            rf,
          });

          await repository.add(aula);
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
    let professores = await professoresRepository.list(2022);
    const turmas = await turmasRepository.list(2022);
    const materias = await materiasRepository.list(2022);
    await this.loadClassrooms(file, professores, turmas, materias);
  }
}
