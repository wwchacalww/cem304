import PDFKit from "pdfkit";
import fs from "fs";
import {dados} from "./vespertino"



export class CapasUsecase {
  async execute() {
    const pdf = new PDFKit({ size: "A4", margin: 44, layout: "portrait" });
    pdf.pipe(fs.createWriteStream(`./tmp/capa-diario.pdf`));
    let ctrl = 0;
    dados.forEach( dado => {
      for( let sem = 1; sem <= 2; sem++) {
        if(ctrl === 0 ) {
          ctrl = 1;
        }else {
          pdf.addPage();
        }
        pdf.rect(29, 50, 534, 710).fillAndStroke("#FFF", "#000");
        pdf.image("./src/assets/img/logoDF.png", 52, 59, { height: 55 });
        pdf.image("./src/assets/img/diarioImg.jpg", 48, 115, { width: 500 });

        let y = 280;
        for (let i = 1; i <= 11; i++) {
          y += 35;
          pdf.rect(29, y, 150, 35).fillAndStroke("", "#000");
          pdf.rect(179, y, 384, 35).fillAndStroke("", "#000");
        }

        pdf.fill("#000").stroke();
        pdf.fontSize(8);
        pdf.font("Helvetica-Bold");
        pdf.text("GOVERNO DO DISTRITO FEDERAL", 179, 70, {
          align: "center",
          width: 384,
        });

        pdf.text("SECRETARIA DE ESTADO DE EDUCAÇAO", 179, 80, {
          align: "center",
          width: 384,
        });

        pdf.text("COORDENAÇÃO REGIONAL DE ENSINO SAMAMBAIA", 179, 90, {
          align: "center",
          width: 384,
        });

        pdf.text("CENTRO DE ENSINO MÉDIO 304 DE SAMAMBAIA", 179, 100, {
          align: "center",
          width: 384,
        });

        let textos = [
          { t: "Professor/Matrícula:", p: `${dado.professor}`},
          { t: "Unidade Curricular:", p: `${dado.uc} - ${dado.uc_id}`},
          { t: "Itinerário formativo:", p: "Trilha de Aprendizagem"},
          { t: "Série/Turma:", p:dado.turma},
          { t: "Código da turma (i-EDUCAR):", p: dado.uc_id},
          { t: "Carga Horária Total (Créditos):", p:"2"},
          { t: "Semestre Letivo:", p: sem + "º Semestre / 2022"},
        ]

        pdf.text("Nº DIÁRIO:", 29, 220, {
          align: "right",
          width: 150,
        });
        
        pdf.font("Helvetica");
        y = 225;
        for (let i = 0; i <= 6; i++) {
          y += 10;
          pdf.text(textos[i].t.toUpperCase(), 29, y, {
            align: "right",
            width: 150,
          });
          pdf.text(textos[i].p.toUpperCase(), 185, y, {
            align: "left",
            width: 375,
          });
        }

        textos = [
          {t:"", p:"CAPA"},
          {t:"", p:"Avaliação Diagnóstica - TURMA"},
          {t:"", p:"I - Frequência/Dias Letivos"},
          {t:"", p:"Objetivos de Aprendizagem e Ações Didático Pedagógico"},
          {t:"", p:"Trilha de Aprendizagem"},
          {t:"", p:"Avaliações - Eletiva orientada"},
          {t:"", p:"Avaliações - Trilha de Aprendizagem"},
          {t:"", p:"RESULTADO FINAL - Eletiva orientada"},
          {t:"", p:"RESULTADO FINAL - Trilha de aprendizagem"},
          {t:"", p:"Informações complementares"},
          {t:"", p:"Lista de Objetivos de Aprendizagens-Consulta"},
        ];

        pdf.fontSize(10);
        pdf.font("Helvetica-Bold");
        for(let i = 0; i <= 10; i++) {
          y += 35;
          pdf.text(textos[i].p.toUpperCase(), 185, y, {
            align: "left",
            width: 375,
          });
        }

        y += 60;
        pdf.fontSize(8);
        pdf.font("Helvetica-Bold");
        pdf.text("DATA", 29, y, {
          align: "center",
          width: 150,
        });
        pdf.moveTo( 185, y+5).lineTo(530, y + 5).stroke();

        y += 10;
        pdf.font("Helvetica");
        if(sem === 1) {
          pdf.text("11/07/2022", 29, y, {
            align: "center",
            width: 150,
          });
        }else {
          pdf.text("22/12/2022", 29, y, {
            align: "center",
            width: 150,
          });
        }
        

        pdf.text("ASSINATURA DO(A) PROFESSOR(A)", 185, y, {
          align: "center",
          width: 345,
        });

        pdf.addPage()

        pdf.image("./src/assets/img/logoDF.png", 52, 59, { height: 55 });
        pdf.fill("#000").stroke();
        pdf.fontSize(10);
        pdf.font("Helvetica-Bold");
        pdf.text("GOVERNO DO DISTRITO FEDERAL", 29, 70, {
          align: "center",
          width: 534,
        });

        pdf.text("SECRETARIA DE ESTADO DE EDUCAÇAO", 29, 82, {
          align: "center",
          width: 534,
        });

        pdf.text("COORDENAÇÃO REGIONAL DE ENSINO SAMAMBAIA", 29, 94, {
          align: "center",
          width: 534,
        });

        pdf.text("CENTRO DE ENSINO MÉDIO 304 DE SAMAMBAIA", 29, 106, {
          align: "center",
          width: 534,
        });

        pdf.lineWidth(2);

        y = 200;
        pdf.rect(29, y, 100, 35).fillAndStroke("#FFF", "#000");
        pdf.rect(129, y, 434, 35).fillAndStroke("#FFF", "#000");
        y += 35;
        pdf.rect(29, y, 100, 35).fillAndStroke("#FFF", "#000");
        pdf.rect(129, y, 434, 35).fillAndStroke("#FFF", "#000");
        y+= 35;
        for (let i = 0; i <= 5; i++) {
          pdf.rect(29, y, 100, 20).fillAndStroke("#FFF", "#000");
          pdf.rect(129, y, 434, 20).fillAndStroke("#FFF", "#000");
          y += 20;
        }
        pdf.rect(29, y, 100, 35).fillAndStroke("#FFF", "#000");
        pdf.rect(129, y, 434, 35).fillAndStroke("#FFF", "#000");
        y+= 35;
        for (let i = 0; i <= 2; i++) {
          pdf.rect(29, y, 100, 20).fillAndStroke("#FFF", "#000");
          pdf.rect(129, y, 434, 20).fillAndStroke("#FFF", "#000");
          y += 20;
        }

        y -= 272;
        pdf.fill("#000").stroke();

        pdf.fontSize(12);
        pdf.font("Helvetica-Bold");
        pdf.text("DIÁRIO DE CLASSE PARA O NOVO ENSINO MÉDIO", 129, y, {
          align: "center",
          width: 434,
        });
        y += 35;
        pdf.text("COMPONENTE/UNIDADE CURRICULAR", 129, y, {
          align: "center",
          width: 434,
        });

        textos = [
          {t: "", p: "CURSO PRESENCIAL"},
          {t: "", p: "ITINENÁRIO FORMATIVO: Trilha de Aprendizagem"},
          {t: "", p: `${dado.uc} - ${dado.uc_id}`},
          {t: "", p: dado.turma},
          {t: "", p: "CÓDIGO DA TURMA (i-EDUCAR): " + dado.uc_id },
          {t: "", p: "CARGA HORÁRIA TOTAL (CRÉDITOS): 2"},
        ]
        pdf.fontSize(10);
        pdf.font("Helvetica");
        y += 8;
        for (let i= 0; i <= 5; i++) {
          y += 20;
          pdf.text(textos[i].p, 134, y, {
            align: "left",
            width: 430,
          });
        }

        y += 28;
        pdf.fontSize(12);
        pdf.font("Helvetica-Bold");
        pdf.text(`SEMESTRE LETIVO: ${sem}º SEMESTRE / 2022`, 129, y, {
          align: "center",
          width: 434,
        });

        y += 28;
        pdf.fontSize(10);
        pdf.font("Helvetica-Bold");
        pdf.text("INÍCIO:", 134, y, {
          align: "left",
          width: 100,
        });
        pdf.font("Helvetica");
        let data_in: string;
        let data_fim: string;
        if(sem === 1) {
           data_in = "14/02/2022"
           data_fim = "11/07/2022"
        }else {
           data_in  = "29/07/2022"
           data_fim = "22/12/2022"
        }
        pdf.text(data_in, 234, y, {
          align: "left",
          width: 100,
        });
        y += 20;
        pdf.fontSize(10);
        pdf.font("Helvetica-Bold");
        pdf.text("TÉRMINO:", 134, y, {
          align: "left",
          width: 100,
        });
        pdf.font("Helvetica");
        pdf.text(data_fim, 234, y, {
          align: "left",
          width: 100,
        });

        y += 60;
        pdf.text(`"Diário de classe - 2022 validado pela circular n.º 02/2022 - SEE/SUPLAV"`, 29, y, {
          align: "center",
          width: 534,
        });

        y += 120;

        pdf.font("Helvetica");
        pdf.text("DATA", 29, y, {
          align: "center",
          width: 150,
        });
        pdf.moveTo( 185, y+5).lineTo(530, y + 5).stroke();

        y += 10;
        pdf.font("Helvetica-Bold");
        pdf.text(data_fim, 29, y, {
          align: "center",
          width: 150,
        });

        pdf.text("Assinatura do(a) Professor(a)", 179, y, {
          align: "center",
          width: 345,
        });
      }
      // fim
    })
    

    pdf.end();

    return "ok";
  }
}
