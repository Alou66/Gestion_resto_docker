-- CreateEnum
CREATE TYPE "Emplacement" AS ENUM ('TERRASSE', 'INTERIEUR', 'VIP');

-- CreateEnum
CREATE TYPE "CategoriePlat" AS ENUM ('ENTREE', 'PLAT', 'DESSERT', 'BOISSON');

-- CreateEnum
CREATE TYPE "StatutPlat" AS ENUM ('DISPONIBLE', 'INDISPONIBLE');

-- CreateEnum
CREATE TYPE "StatutCommande" AS ENUM ('EN_COURS', 'SERVIE', 'ANNULEE');

-- CreateTable
CREATE TABLE "Table" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "capacite" INTEGER NOT NULL,
    "emplacement" "Emplacement" NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableServeur" (
    "tableId" INTEGER NOT NULL,
    "serveurId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TableServeur_pkey" PRIMARY KEY ("tableId","serveurId")
);

-- CreateTable
CREATE TABLE "Serveur" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "Serveur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plat" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "categorie" "CategoriePlat" NOT NULL,
    "prix" DECIMAL(10,2) NOT NULL,
    "statut" "StatutPlat" NOT NULL DEFAULT 'DISPONIBLE',

    CONSTRAINT "Plat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" SERIAL NOT NULL,
    "tableId" INTEGER NOT NULL,
    "serveurId" INTEGER NOT NULL,
    "platId" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,
    "montantTotal" DECIMAL(10,2) NOT NULL,
    "statut" "StatutCommande" NOT NULL DEFAULT 'EN_COURS',
    "dateCommande" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Table_numero_key" ON "Table"("numero");

-- CreateIndex
CREATE INDEX "Table_numero_idx" ON "Table"("numero");

-- CreateIndex
CREATE INDEX "TableServeur_tableId_idx" ON "TableServeur"("tableId");

-- CreateIndex
CREATE INDEX "TableServeur_serveurId_idx" ON "TableServeur"("serveurId");

-- CreateIndex
CREATE UNIQUE INDEX "Serveur_email_key" ON "Serveur"("email");

-- CreateIndex
CREATE INDEX "Serveur_email_idx" ON "Serveur"("email");

-- CreateIndex
CREATE INDEX "Plat_categorie_idx" ON "Plat"("categorie");

-- CreateIndex
CREATE INDEX "Plat_statut_idx" ON "Plat"("statut");

-- CreateIndex
CREATE INDEX "Commande_tableId_idx" ON "Commande"("tableId");

-- CreateIndex
CREATE INDEX "Commande_serveurId_idx" ON "Commande"("serveurId");

-- CreateIndex
CREATE INDEX "Commande_platId_idx" ON "Commande"("platId");

-- CreateIndex
CREATE INDEX "Commande_statut_idx" ON "Commande"("statut");

-- CreateIndex
CREATE INDEX "Commande_dateCommande_idx" ON "Commande"("dateCommande");

-- AddForeignKey
ALTER TABLE "TableServeur" ADD CONSTRAINT "TableServeur_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableServeur" ADD CONSTRAINT "TableServeur_serveurId_fkey" FOREIGN KEY ("serveurId") REFERENCES "Serveur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_serveurId_fkey" FOREIGN KEY ("serveurId") REFERENCES "Serveur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_platId_fkey" FOREIGN KEY ("platId") REFERENCES "Plat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
