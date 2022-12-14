import { Router } from "express";
import { aulasRouter } from "./aulas.router";
import { gradesRouter } from "./grades.router";
import { materiasRouter } from "./materias.router";
import { professoresRouter } from "./professores.router";
import { turmaRouter } from "./turmas.router";

const router = Router();

router.use("/turmas", turmaRouter);
router.use("/materias", materiasRouter);
router.use("/professores", professoresRouter);
router.use("/grades", gradesRouter);
router.use("/aulas", aulasRouter);

export { router };
