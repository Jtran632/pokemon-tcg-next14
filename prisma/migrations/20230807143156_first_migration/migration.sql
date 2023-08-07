-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "favorites_imageUrl_key" ON "favorites"("imageUrl");
