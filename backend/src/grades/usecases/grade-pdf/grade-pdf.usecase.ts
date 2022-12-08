import PDFKit from "pdfkit";
import fs from "fs";
import { GradesRepository } from "../../repository/grades.repository";
import { stringify } from "querystring";

type HorarioProps = {
  horario: string;
  disciplinas: {
    professor: string;
    materia: string;
  }[];
};

type GradeProps = {
  dia: number;
  horarios: HorarioProps[];
};

const pdf = new PDFKit({ size: "A4", margin: 44, layout: "landscape" });

export class GradePDFUsecase {
  async execute(turma_id: string) {
    const repository = new GradesRepository();

    const grades = await repository.horarioTurma(turma_id);

    const aulas: GradeProps[] = [];

    grades.forEach((grade) => {
      const dia = aulas.findIndex((aula) => aula.dia === grade.dia.id);
      if (dia === -1) {
        aulas.push({
          dia: grade.dia.id,
          horarios: [
            {
              horario: grade.horario,
              disciplinas: [
                {
                  professor: grade.professor.nome,
                  materia: grade.materia.nome,
                },
              ],
            },
          ],
        });
      } else {
        const hora = aulas[dia].horarios.findIndex(
          (horario) => horario.horario === grade.horario
        );
        if (hora === -1) {
          aulas[dia].horarios.push({
            horario: grade.horario,
            disciplinas: [
              {
                professor: grade.professor.nome,
                materia: grade.materia.nome,
              },
            ],
          });
        } else {
          aulas[dia].horarios[hora].disciplinas.push({
            professor: grade.professor.nome,
            materia: grade.materia.nome,
          });
        }
      }
    });

    pdf.pipe(fs.createWriteStream(`./tmp/grade.pdf`));

    pdf.fontSize(16);
    pdf.font("Helvetica-Bold");
    pdf.text("Horário", { align: "center", lineGap: 3 });
    pdf.fontSize(10);
    // for (let pY = 5; pY <= 580; pY += 5) {
    //   pdf.rect(5, pY, 830, 10).fillOpacity(0.5).fillAndStroke("#fff", "#ccc");
    // }
    // for (let pX = 5; pX <= 825; pX += 5) {
    //   pdf.rect(pX, 5, 10, 585).fillOpacity(0.5).fillAndStroke("#fff", "#ccc");
    // }

    // Desenhando tabela
    pdf.rect(30, 80, 50, 20).fillOpacity(0.5).fillAndStroke("#ccc", "#000");
    for (let i = 1; i <= 5; i++) {
      const x = i * 149;
      pdf
        .rect(80 + x - 149, 80, 149, 20)
        .fillOpacity(0.5)
        .fillAndStroke("#ccc", "#000");
    }
    // Area da tabela
    // pdf.rect(30, 100, 795, 400).fillOpacity(0.5).stroke("#000");

    for (let i = 1; i <= 6; i++) {
      const y = i * 67;
      pdf
        .rect(30, y + 33, 50, 67)
        .fillOpacity(0.5)
        .fillAndStroke("#ccc", "#000");
      for (let j = 1; j <= 5; j++) {
        const x = j * 149;
        pdf
          .rect(80 + x - 149, y + 33, 149, 67)
          .fillOpacity(1)
          .fillAndStroke("#fff", "#000");
      }
    }

    // Cabeçalho da Tabela
    pdf.fill("#000").stroke();
    pdf.text("#", 30, 85, {
      align: "center",
      lineBreak: false,
      width: 50,
      height: 67,
    });

    // Dias da semana
    for (let i = 1; i <= 5; i++) {
      const x = i * 149;
      switch (i) {
        case 1:
          pdf.text("SEGUNDA", 80 + x - 149, 85, {
            align: "center",
            width: 149,
          });
          break;

        case 2:
          pdf.text("TERÇA", 80 + x - 149, 85, {
            align: "center",
            width: 149,
          });
          break;

        case 3:
          pdf.text("QUARTA", 80 + x - 149, 85, {
            align: "center",
            width: 149,
          });
          break;

        case 4:
          pdf.text("QUINTA", 80 + x - 149, 85, {
            align: "center",
            width: 149,
          });
          break;

        case 5:
          pdf.text("SEXTA", 80 + x - 149, 85, {
            align: "center",
            width: 149,
          });
          break;
      }
    }

    // Horarios
    pdf.fontSize(20);
    pdf.font("Helvetica-Bold");
    for (let i = 1; i <= 6; i++) {
      const y = i * 67;
      pdf.text(`${i}º`, 30, y + 67, {
        align: "center",
        lineBreak: false,
        width: 50,
        baseline: "middle",
      });
    }

    // Preencher o horário
    pdf.fontSize(8);

    aulas.forEach((aula) => {
      const x = aula.dia * 149;
      aula.horarios.forEach((horario) => {
        let text = "";
        switch (horario.horario) {
          case "1º":
            text = "";
            horario.disciplinas.forEach((dis) => {
              text = `${text} ${dis.materia}\n`;
            });
            pdf.text(text, 80 + x - 149, 110, {
              align: "center",
              lineBreak: false,
              width: 149,
              baseline: "top",
            });
            break;
          case "2º":
            text = "";
            horario.disciplinas.forEach((dis) => {
              text = `${text} ${dis.materia}\n`;
            });
            pdf.text(text, 80 + x - 149, 177, {
              align: "center",
              lineBreak: false,
              width: 149,
              baseline: "top",
            });
            break;
          case "3º":
            text = "";
            horario.disciplinas.forEach((dis) => {
              text = `${text} ${dis.materia}\n`;
            });
            pdf.text(text, 80 + x - 149, 244, {
              align: "center",
              lineBreak: false,
              width: 149,
              baseline: "top",
            });
            break;
          case "4º":
            text = "";
            horario.disciplinas.forEach((dis) => {
              text = `${text} ${dis.materia}\n`;
            });
            pdf.text(text, 80 + x - 149, 311, {
              align: "center",
              lineBreak: false,
              width: 149,
              baseline: "top",
            });
            break;
          case "5º":
            text = "";
            horario.disciplinas.forEach((dis) => {
              text = `${text} ${dis.materia}\n`;
            });
            pdf.text(text, 80 + x - 149, 378, {
              align: "center",
              lineBreak: false,
              width: 149,
              baseline: "top",
            });
            break;
          case "6º":
            text = "";
            horario.disciplinas.forEach((dis) => {
              text = `${text} ${dis.materia}\n`;
            });
            pdf.text(text, 80 + x - 149, 445, {
              align: "center",
              lineBreak: false,
              width: 149,
              baseline: "top",
            });
            break;
        }
      });
    });

    pdf.end();

    return "ok";
  }
}
