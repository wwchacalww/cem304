/*
  Warnings:

  - You are about to drop the `aulas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "aulas";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "grades" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dia" INTEGER NOT NULL,
    "horario" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "materia_id" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,
    "turma_id" TEXT NOT NULL,
    CONSTRAINT "grades_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "materias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "grades_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "grades_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
