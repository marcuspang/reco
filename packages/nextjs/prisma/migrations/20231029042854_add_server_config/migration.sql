-- CreateTable
CREATE TABLE "ServerWelcomeMessage" (
    "id" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ServerWelcomeMessage_pkey" PRIMARY KEY ("id")
);
