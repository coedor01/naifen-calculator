-- CreateTable
CREATE TABLE "Report" (
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

-- CreateTable
CREATE TABLE "ProductElement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "element" TEXT NOT NULL,
    "content" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "ProductElement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "price" REAL NOT NULL,
    "standardId" INTEGER NOT NULL,
    CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_standardId_fkey" FOREIGN KEY ("standardId") REFERENCES "Standard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isForeign" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "StandardElement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "element" TEXT NOT NULL,
    "content" INTEGER NOT NULL,
    "min" REAL NOT NULL,
    "max" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Standard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
