import { AddTurmaController } from "@turmas/usecase/add/add-turma.controller";
import { ImportTurmasController } from "@turmas/usecase/import/import-turmas.controller";
import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../config/upload";

const upload = multer(uploadConfig.upload("./tmp"));

const turmaRouter = Router();

const addTurmaController = new AddTurmaController();
const importTurmasController = new ImportTurmasController();

turmaRouter.post("/", addTurmaController.handle);
turmaRouter.post(
  "/import",
  upload.single("file"),
  importTurmasController.handle
);

export { turmaRouter };
