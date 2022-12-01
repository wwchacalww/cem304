import { ImportReportController } from "grades/usecases/import-report/import-report.controller";
import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../config/upload";

const upload = multer(uploadConfig.upload("./tmp"));

const gradesRouter = Router();

const importReportController = new ImportReportController();

gradesRouter.post(
  "/import-report",
  upload.single("file"),
  importReportController.handle
);

export { gradesRouter };
