-- CreateTable
CREATE TABLE "agendas" (
    "id" TEXT NOT NULL,
    "mes" INTEGER NOT NULL,
    "dia" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "agendas_pkey" PRIMARY KEY ("id")
);
