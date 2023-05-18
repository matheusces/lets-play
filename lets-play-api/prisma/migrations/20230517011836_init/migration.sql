-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupParticipants" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,

    CONSTRAINT "GroupParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchParticipants" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,

    CONSTRAINT "MatchParticipants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupParticipants" ADD CONSTRAINT "GroupParticipants_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupParticipants" ADD CONSTRAINT "GroupParticipants_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchParticipants" ADD CONSTRAINT "MatchParticipants_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchParticipants" ADD CONSTRAINT "MatchParticipants_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
