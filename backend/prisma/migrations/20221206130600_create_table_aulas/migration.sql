-- CreateTable
CREATE TABLE "aulas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "horario" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "rf" INTEGER NOT NULL DEFAULT 0,
    "materia_id" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,
    "turma_id" TEXT NOT NULL,
    CONSTRAINT "aulas_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "materias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "aulas_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "aulas_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
