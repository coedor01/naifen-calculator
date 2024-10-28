/*
  Warnings:

  - You are about to drop the `Standard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StandardElement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `standardId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `standardId` on the `Report` table. All the data in the column will be lost.
  - Added the required column `standard` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Standard";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StandardElement";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "energy" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("brandId", "energy", "id", "level", "name", "price", "weight") SELECT "brandId", "energy", "id", "level", "name", "price", "weight" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "standard" TEXT NOT NULL,
    "element" TEXT NOT NULL,
    "content" INTEGER NOT NULL,
    "minContent" INTEGER NOT NULL,
    "maxContent" INTEGER NOT NULL,
    "cmp" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "Report_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("cmp", "content", "element", "id", "maxContent", "minContent", "productId") SELECT "cmp", "content", "element", "id", "maxContent", "minContent", "productId" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
