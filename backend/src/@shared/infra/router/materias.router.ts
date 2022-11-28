import { AddMateriaController } from "@materias/usecases/add-materia/add-materia.controller";
import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../config/upload";

// const upload = multer(uploadConfig.upload("./tmp"));

const materiasRouter = Router();

const addMateriaController = new AddMateriaController();
// const importMateriasController = new ImportMateriasController();

materiasRouter.post("/", addMateriaController.handle);
// materiasRouter.post(
//   "/import",
//   upload.single("file"),
//   importmateriassController.handle
// );

export { materiasRouter };
