import PDFKit from "pdfkit";
import fs from "fs";
import { AulasRepository } from "../../repository/aulas.repository";
import { InputListRF } from "../../domain/repository/aulas-repository.interface";
import { ProfessoresRepository } from "../../../professores/repository/professores.repository";
import { qualMes } from "../../../@shared/utils/utils";

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

type AulasProps = {
  mes: number;
  dia: number;
  horario: number;
  turma: string;
  rf: string;
};

const pdf = new PDFKit({ size: "A4", margin: 44, layout: "portrait" });

export class CalendarioPDFUsecase {
  async execute({ professor_id, period }: InputListRF) {
    const repository = new AulasRepository();
    const professorRepository = new ProfessoresRepository();

    const professor = await professorRepository.show(professor_id);
    const aulas = await repository.listRF({ professor_id, period });
    // Preencher as aulas
    const aulasArray: AulasProps[] = [];
    aulas.forEach((aula) => {
      const data = new Date(aula.data);
      const mes = data.getMonth();
      const dia = data.getDate();
      const horario = Number(aula.horario.substring(1, 0));
      const turma = aula.turma.nome.substring(0, 8);
      let rf = "---";
      switch (aula.rf) {
        case 1:
          rf = "R";
          break;
        case 2:
          rf = "F";
          break;
        case 3:
          rf = "RF";
          break;
        default:
          rf = "---";
          break;
      }

      aulasArray.push({
        mes,
        dia,
        horario,
        turma,
        rf,
      });
    });

    pdf.pipe(
      fs.createWriteStream(`./tmp/${professor.nome.replaceAll(" ", "-")}.pdf`)
    );

    for (let mesCal = 2; mesCal <= 12; mesCal++) {
      if (mesCal > 2) {
        pdf.addPage();
      }
      const bi = (mes: number) => {
        if (mes < 5) {
          return "1º Bimestre";
        }
        if (mes >= 5 && mes <= 7) {
          return "2º Bimestre";
        }
        if (mes >= 8 && mes <= 9) {
          return "3º Bimestre";
        }
        if (mes >= 10) {
          return "4º Bimestre";
        }
        return "";
      };
      pdf.fontSize(16);
      pdf.font("Helvetica-Bold");
      pdf.text(bi(mesCal), { align: "center", lineGap: 3 });
      pdf.font("Helvetica");
      pdf.fontSize(12);
      pdf.text("Professor: " + professor.nome, { align: "left" });

      // pdf.fontSize(10);
      // for (let pY = 5; pY <= 580; pY += 5) {
      //   pdf.rect(5, pY, 830, 10).fillOpacity(0.5).fillAndStroke("#fff", "#ccc");
      // }
      // for (let pX = 5; pX <= 825; pX += 5) {
      //   pdf.rect(pX, 5, 10, 585).fillOpacity(0.5).fillAndStroke("#fff", "#ccc");
      // }

      // Desenhando tabela
      pdf.rect(29, 80, 534, 20).fillAndStroke("#F59E0B", "#000");

      for (let i = 1; i <= 6; i++) {
        const x = i * 89 - 89;
        pdf.rect(29 + x, 100, 89, 20).fillAndStroke("#fff", "#000");
        pdf.fontSize(12);
        pdf.fill("#000").stroke();
        switch (i) {
          case 1:
            pdf.text("SEGUNDA", 29, 106, {
              align: "center",
              lineBreak: false,
              width: 89,
            });

            break;
          case 2:
            pdf.text("TERÇA", 30 + x, 106, {
              align: "center",
              lineBreak: false,
              width: 89,
            });
            break;
          case 3:
            pdf.text("QUARTA", 30 + x, 106, {
              align: "center",
              lineBreak: false,
              width: 89,
            });
            break;
          case 4:
            pdf.text("QUINTA", 30 + x, 106, {
              align: "center",
              lineBreak: false,
              width: 89,
            });
            break;
          case 5:
            pdf.text("SEXTA", 30 + x, 106, {
              align: "center",
              lineBreak: false,
              width: 89,
            });
            break;
          case 6:
            pdf.text("SÁBADO", 30 + x, 106, {
              align: "center",
              lineBreak: false,
              width: 89,
            });
            break;
        }
      }

      for (let i = 1; i <= 6; i++) {
        const y = i * 65 - 65;
        pdf.rect(29, y + 120, 89, 65).fillAndStroke("#fff", "#000");
        for (let j = 1; j <= 5; j++) {
          const x = j * 89 - 89;
          pdf.rect(29 + 89 + x, y + 120, 89, 65).fillAndStroke("#fff", "#000");
        }
      }

      pdf.fill("#FFF").stroke();
      pdf.fontSize(16);
      pdf.text(qualMes(mesCal), 30, 84, {
        align: "center",
        lineBreak: false,
        width: 532,
      });

      pdf.fontSize(8);
      pdf.font("Helvetica");
      pdf.fill("#000").stroke();

      // Digito do dia do mês

      let diaMes = new Date(2022, mesCal, 0).getDate();
      let diaSem = new Date(`2022-${mesCal}-01 10:00:00`).getDay();
      let dia = 1;
      let y = 90;
      for (let i = 1; i <= 36; i++) {
        const ctrl = i % 6 === 0 ? 6 : i % 6;
        const x = ctrl * 89 - 89;
        y = i % 6 === 1 ? y + 65 : y;
        if ((dia + diaSem) % 7 === 1) {
          dia++;
        }
        if (i >= diaSem && dia <= diaMes) {
          const diaTxt = dia < 10 ? `0${dia}` : `${dia}`;

          pdf.fontSize(30);
          pdf.font("Helvetica-Bold");
          pdf.fill("#cfcfcf").stroke();
          pdf.text(diaTxt, 71 + x, y);

          if (mesCal === 7 && dia >= 11 && dia <= 29) {
            pdf.fontSize(12);
            pdf.font("Helvetica-Bold");
            pdf.fill("#000").stroke();
            pdf.text("RECESSO", 50 + x, y - 20, {
              width: 70,
            });
          }

          const aula = aulasArray.filter(
            (a) => a.dia === dia && a.mes === mesCal - 1
          );

          pdf.fontSize(8);
          pdf.font("Helvetica");
          pdf.fill("#000").stroke();

          for (let j = 1; j <= 6; j++) {
            const jy = j * 10 + y;
            pdf.text(j + "º - ", 35 + x, jy - 40, {
              align: "left",
              width: 20,
            });

            const index = aula.findIndex((a) => a.horario === j);
            if (index !== -1) {
              const txt = `${aula[index].turma} - ${aula[index].rf}`;
              pdf.text(txt, 55 + x, jy - 40, {
                align: "left",
                width: 65,
              });
            }
          }

          dia++;
        }
      }
    }
    pdf.end();

    return "ok";
  }
}
