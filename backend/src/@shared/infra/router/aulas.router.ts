import { ImportReportController } from "aulas/usecases/import-report/import-report.controller";
import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../config/upload";

const upload = multer(uploadConfig.upload("./tmp"));

const aulasRouter = Router();

const importReportController = new ImportReportController();

aulasRouter.post(
  "/import-report",
  upload.single("file"),
  importReportController.handle
);

export { aulasRouter };
