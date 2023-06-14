/*
  Warnings:

  - Added the required column `gameImage` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameTitle` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voiceChannel` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "gameImage" TEXT NOT NULL,
ADD COLUMN     "gameTitle" TEXT NOT NULL,
ADD COLUMN     "voiceChannel" TEXT NOT NULL;
