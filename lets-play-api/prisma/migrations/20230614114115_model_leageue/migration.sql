-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "leagueId" TEXT;

-- CreateTable
CREATE TABLE "League" (
    "id" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "game_img" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "leagueSize" INTEGER NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE SET NULL ON UPDATE CASCADE;
