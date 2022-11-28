import { Router } from "express";
import { materiasRouter } from "./materias.router";
import { turmaRouter } from "./turmas.router";

const router = Router();

router.use("/turmas", turmaRouter);
router.use("/materias", materiasRouter);

export { router };
