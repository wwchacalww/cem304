-- CreateTable
CREATE TABLE "turmas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,

    CONSTRAINT "turmas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professores" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "professores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,

    CONSTRAINT "materias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grades" (
    "id" TEXT NOT NULL,
    "dia" INTEGER NOT NULL,
    "horario" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "materia_id" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,
    "turma_id" TEXT NOT NULL,

    CONSTRAINT "grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aulas" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horario" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "rf" INTEGER NOT NULL DEFAULT 0,
    "materia_id" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,
    "turma_id" TEXT NOT NULL,

    CONSTRAINT "aulas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessoresOnTurmas" (
    "professor_id" TEXT NOT NULL,
    "turma_id" TEXT NOT NULL,

    CONSTRAINT "ProfessoresOnTurmas_pkey" PRIMARY KEY ("professor_id","turma_id")
);

-- CreateTable
CREATE TABLE "MateriasOnTurmas" (
    "materia_id" TEXT NOT NULL,
    "turma_id" TEXT NOT NULL,

    CONSTRAINT "MateriasOnTurmas_pkey" PRIMARY KEY ("materia_id","turma_id")
);

-- CreateTable
CREATE TABLE "MateriasOnProfessores" (
    "materia_id" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,

    CONSTRAINT "MateriasOnProfessores_pkey" PRIMARY KEY ("materia_id","professor_id")
);

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aulas" ADD CONSTRAINT "aulas_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aulas" ADD CONSTRAINT "aulas_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aulas" ADD CONSTRAINT "aulas_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessoresOnTurmas" ADD CONSTRAINT "ProfessoresOnTurmas_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessoresOnTurmas" ADD CONSTRAINT "ProfessoresOnTurmas_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriasOnTurmas" ADD CONSTRAINT "MateriasOnTurmas_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriasOnTurmas" ADD CONSTRAINT "MateriasOnTurmas_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriasOnProfessores" ADD CONSTRAINT "MateriasOnProfessores_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriasOnProfessores" ADD CONSTRAINT "MateriasOnProfessores_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
