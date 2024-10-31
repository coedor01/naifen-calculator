/*
  Warnings:

  - You are about to alter the column `content` on the `ReportDetail` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReportDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reportId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "element" TEXT NOT NULL,
    "content" REAL NOT NULL,
    "minContent" INTEGER NOT NULL,
    "maxContent" INTEGER NOT NULL,
    "cmp" INTEGER NOT NULL,
    CONSTRAINT "ReportDetail_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReportDetail" ("cmp", "content", "element", "id", "maxContent", "minContent", "reportId", "type") SELECT "cmp", "content", "element", "id", "maxContent", "minContent", "reportId", "type" FROM "ReportDetail";
DROP TABLE "ReportDetail";
ALTER TABLE "new_ReportDetail" RENAME TO "ReportDetail";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
