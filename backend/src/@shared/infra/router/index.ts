import { Router } from "express";
import { turmaRouter } from "./turmas.router";

const router = Router();

router.use("/turmas", turmaRouter);

export { router };
