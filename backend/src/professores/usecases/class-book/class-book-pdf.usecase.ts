import fs from "fs";
import { parse } from "csv-parse";

export class ClassBookPDFUsecase {
  loadClassrooms(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const parseFile = parse({
        delimiter: ",",
      });

      stream.pipe(parseFile);
      let ln = 0;
      parseFile
        .on("data", async (line) => {
          const [
            matricula,
            nome,
            CPF,
            role,
            sub,
            Turma,
            qt_aulas,
            disciplina,
            inicio_vigencia,
            fim_vigencia,
          ] = line;
          console.log(line);
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          // resolve();
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    this.loadClassrooms(file);
  }
}
