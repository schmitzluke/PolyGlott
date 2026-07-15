-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "apiKey" TEXT,
    "onboarded" BOOLEAN NOT NULL DEFAULT false,
    "nativeLanguage" TEXT NOT NULL DEFAULT 'de',
    "targetLanguage" TEXT NOT NULL DEFAULT 'tr',
    "selfLevel" TEXT NOT NULL DEFAULT 'A1',
    "confirmedLevel" TEXT,
    "dailyGoalXp" INTEGER NOT NULL DEFAULT 30,
    "notifications" BOOLEAN NOT NULL DEFAULT true,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "xpTotal" INTEGER NOT NULL DEFAULT 0,
    "streakFreezes" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "Follows" (
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    PRIMARY KEY ("followerId", "followingId"),
    CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StashSentence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "germanOriginal" TEXT NOT NULL,
    "turkishTranslation" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StashSentence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IslandPack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "IslandSentence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packId" TEXT NOT NULL,
    "germanOriginal" TEXT NOT NULL,
    "turkishTranslation" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "IslandSentence_packId_fkey" FOREIGN KEY ("packId") REFERENCES "IslandPack" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReviewItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "stashSentenceId" TEXT,
    "islandSentenceId" TEXT,
    "stability" REAL NOT NULL DEFAULT 0,
    "difficulty" REAL NOT NULL DEFAULT 0,
    "elapsed_days" INTEGER NOT NULL DEFAULT 0,
    "scheduled_days" INTEGER NOT NULL DEFAULT 0,
    "reps" INTEGER NOT NULL DEFAULT 0,
    "lapses" INTEGER NOT NULL DEFAULT 0,
    "state" INTEGER NOT NULL DEFAULT 0,
    "last_review" DATETIME,
    "dueAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReviewItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReviewItem_stashSentenceId_fkey" FOREIGN KEY ("stashSentenceId") REFERENCES "StashSentence" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReviewItem_islandSentenceId_fkey" FOREIGN KEY ("islandSentenceId") REFERENCES "IslandSentence" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Streak" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "current" INTEGER NOT NULL DEFAULT 0,
    "longest" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TEXT,
    "freezesUsed" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Streak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "XpEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "XpEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "threshold" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "unlockedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_apiKey_key" ON "User"("apiKey");

-- CreateIndex
CREATE INDEX "Follows_followerId_idx" ON "Follows"("followerId");

-- CreateIndex
CREATE INDEX "Follows_followingId_idx" ON "Follows"("followingId");

-- CreateIndex
CREATE INDEX "StashSentence_userId_status_idx" ON "StashSentence"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "IslandPack_slug_key" ON "IslandPack"("slug");

-- CreateIndex
CREATE INDEX "ReviewItem_userId_dueAt_idx" ON "ReviewItem"("userId", "dueAt");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewItem_userId_stashSentenceId_key" ON "ReviewItem"("userId", "stashSentenceId");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewItem_userId_islandSentenceId_key" ON "ReviewItem"("userId", "islandSentenceId");

-- CreateIndex
CREATE UNIQUE INDEX "Streak_userId_key" ON "Streak"("userId");

-- CreateIndex
CREATE INDEX "XpEvent_userId_createdAt_idx" ON "XpEvent"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_code_key" ON "Achievement"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

