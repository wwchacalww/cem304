import { InputAddTurma } from "@shared/dto";
import { Turma } from "@turmas/domain/entity/turma";
import { TurmasRepository } from "@turmas/repository/turmas.repository";
import { parse } from "csv-parse";
import fs from "fs";

export class ImportTurmasUsecase {
  loadClassrooms(file: Express.Multer.File): Promise<InputAddTurma[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const classrooms: InputAddTurma[] = [];

      const parseFile = parse({
        delimiter: ",",
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [nome, serie, turno, ano] = line;

          classrooms.push({
            nome,
            serie,
            turno,
            ano: Number(ano),
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(classrooms);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    const classrooms: InputAddTurma[] = await this.loadClassrooms(file);
    const repository = new TurmasRepository();

    classrooms.forEach(async (classroom: InputAddTurma) => {
      const turma = new Turma(classroom);
      await repository.add(turma);
    });
  }
}
