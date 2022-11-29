import { Router } from "express";
import { materiasRouter } from "./materias.router";
import { professoresRouter } from "./professores.router";
import { turmaRouter } from "./turmas.router";

const router = Router();

router.use("/turmas", turmaRouter);
router.use("/materias", materiasRouter);
router.use("/professores", professoresRouter);

export { router };
