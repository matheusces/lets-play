/*
  Warnings:

  - You are about to drop the `MatchTeams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MatchTeams" DROP CONSTRAINT "MatchTeams_match_id_fkey";

-- DropForeignKey
ALTER TABLE "MatchTeams" DROP CONSTRAINT "MatchTeams_team_id_fkey";

-- DropTable
DROP TABLE "MatchTeams";

-- CreateTable
CREATE TABLE "MatchParticipants" (
    "id" TEXT NOT NULL,
    "match_id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,

    CONSTRAINT "MatchParticipants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatchParticipants" ADD CONSTRAINT "MatchParticipants_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchParticipants" ADD CONSTRAINT "MatchParticipants_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
