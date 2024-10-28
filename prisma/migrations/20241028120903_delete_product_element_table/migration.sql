/*
  Warnings:

  - You are about to drop the `ProductElement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `standard` on the `Report` table. All the data in the column will be lost.
  - Added the required column `standardId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductElement";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "element" TEXT NOT NULL,
    "content" INTEGER NOT NULL,
    "minContent" INTEGER NOT NULL,
    "maxContent" INTEGER NOT NULL,
    "cmp" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "standardId" INTEGER NOT NULL,
    CONSTRAINT "Report_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Report_standardId_fkey" FOREIGN KEY ("standardId") REFERENCES "Standard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("cmp", "content", "element", "id", "maxContent", "minContent", "productId") SELECT "cmp", "content", "element", "id", "maxContent", "minContent", "productId" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
