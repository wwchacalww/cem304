import { CalendarioPDFController } from "aulas/usecases/calendario-pdf/calendario-pdf.controller";
import { Router } from "express";
import { AddProfessorController } from "professores/usecases/add-professor/add-materia.controller";
import { ClassBookPDFController } from "professores/usecases/class-book/class-book-pdf.controller";
import { DisciplinarController } from "professores/usecases/disciplinar/disciplinar.controller";
import { EnturmarController } from "professores/usecases/enturmar/enturmar.controller";
import { ListProfessoresController } from "professores/usecases/list-professores/list-professores.controller";
import multer from "multer";
import uploadConfig from "../../config/upload";

const upload = multer(uploadConfig.upload("./tmp"));

const professoresRouter = Router();

const addProfessorController = new AddProfessorController();
const enturmarController = new EnturmarController();
const disciplinarController = new DisciplinarController();
const calendarioPDFController = new CalendarioPDFController();
const listProfessoresController = new ListProfessoresController();
const classBookPDFController = new ClassBookPDFController();

professoresRouter.post("/", addProfessorController.handle);
professoresRouter.post("/enturmar", enturmarController.handle);
professoresRouter.post("/disciplina", disciplinarController.handle);
professoresRouter.post(
  "/class-book-pdf",
  upload.single("file"),
  classBookPDFController.handle
);
professoresRouter.get("/calendario", calendarioPDFController.handle);
professoresRouter.get("/list", listProfessoresController.handle);

export { professoresRouter };
