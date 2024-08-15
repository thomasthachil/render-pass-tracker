-- CreateTable
CREATE TABLE "RenderPassReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportId" TEXT NOT NULL,
    "flowInstanceId" TEXT NOT NULL,
    "sourceScreen" TEXT,
    "destinationScreen" TEXT NOT NULL,
    "flowStartTimeSinceEpochMillis" REAL NOT NULL,
    "timeToConsumeTouchEventMillis" REAL,
    "timeToBootJsMillis" REAL,
    "renderPassName" TEXT,
    "timeToRenderMillis" REAL,
    "timeToAbortMillis" REAL,
    "interactive" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
