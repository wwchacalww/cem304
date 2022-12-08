import { ImportReportController } from "grades/usecases/import-report/import-report.controller";
import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../config/upload";
import { CheckImportController } from "grades/usecases/check-import/check-import.controller";

const upload = multer(uploadConfig.upload("./tmp"));

const gradesRouter = Router();

const importReportController = new ImportReportController();
const checkImportController = new CheckImportController();

gradesRouter.post(
  "/import-report",
  upload.single("file"),
  importReportController.handle
);

gradesRouter.post(
  "/check-import",
  upload.single("file"),
  checkImportController.handle
);

export { gradesRouter };
