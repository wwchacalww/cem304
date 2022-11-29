import { Router } from "express";
import { AddProfessorController } from "professores/usecases/add-professor/add-materia.controller";

const professoresRouter = Router();

const addProfessorController = new AddProfessorController();

professoresRouter.post("/", addProfessorController.handle);

export { professoresRouter };
