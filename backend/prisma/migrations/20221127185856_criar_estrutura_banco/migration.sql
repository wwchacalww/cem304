-- CreateTable
CREATE TABLE "turmas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "ano" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "professores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "materias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "ano" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "aulas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dia" INTEGER NOT NULL,
    "horario" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "materia_id" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,
    "turma_id" TEXT NOT NULL,
    CONSTRAINT "aulas_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "materias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "aulas_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "aulas_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProfessoresOnTurmas" (
    "professor_id" TEXT NOT NULL,
    "turma_id" TEXT NOT NULL,

    PRIMARY KEY ("professor_id", "turma_id"),
    CONSTRAINT "ProfessoresOnTurmas_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProfessoresOnTurmas_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MateriasOnTurmas" (
    "materia_id" TEXT NOT NULL,
    "turma_id" TEXT NOT NULL,

    PRIMARY KEY ("materia_id", "turma_id"),
    CONSTRAINT "MateriasOnTurmas_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "materias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MateriasOnTurmas_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MateriasOnProfessores" (
    "materia_id" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,

    PRIMARY KEY ("materia_id", "professor_id"),
    CONSTRAINT "MateriasOnProfessores_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "materias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MateriasOnProfessores_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
