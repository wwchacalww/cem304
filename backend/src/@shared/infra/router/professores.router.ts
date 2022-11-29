import { Router } from "express";
import { AddProfessorController } from "professores/usecases/add-professor/add-materia.controller";
import { DisciplinarController } from "professores/usecases/disciplinar/disciplinar.controller";
import { EnturmarController } from "professores/usecases/enturmar/enturmar.controller";

const professoresRouter = Router();

const addProfessorController = new AddProfessorController();
const enturmarController = new EnturmarController();
const disciplinarController = new DisciplinarController();

professoresRouter.post("/", addProfessorController.handle);
professoresRouter.post("/enturmar", enturmarController.handle);
professoresRouter.post("/disciplina", disciplinarController.handle);

export { professoresRouter };
