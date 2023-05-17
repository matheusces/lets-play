/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MatchParticipants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MatchParticipants" DROP CONSTRAINT "MatchParticipants_group_id_fkey";

-- DropForeignKey
ALTER TABLE "MatchParticipants" DROP CONSTRAINT "MatchParticipants_participant_id_fkey";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "MatchParticipants";

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "win" INTEGER NOT NULL,
    "draw" INTEGER NOT NULL,
    "loses" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamParticipants" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,

    CONSTRAINT "TeamParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchTeams" (
    "id" TEXT NOT NULL,
    "match_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "MatchTeams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamParticipants" ADD CONSTRAINT "TeamParticipants_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamParticipants" ADD CONSTRAINT "TeamParticipants_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTeams" ADD CONSTRAINT "MatchTeams_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTeams" ADD CONSTRAINT "MatchTeams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
