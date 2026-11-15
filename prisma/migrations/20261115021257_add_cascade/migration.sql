-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PasswordReset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PasswordReset" ("code", "createdAt", "expiresAt", "id", "used", "userId") SELECT "code", "createdAt", "expiresAt", "id", "used", "userId" FROM "PasswordReset";
DROP TABLE "PasswordReset";
ALTER TABLE "new_PasswordReset" RENAME TO "PasswordReset";
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "store_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("category_id", "createdAt", "description", "id", "name", "price", "stock", "store_id", "updatedAt") SELECT "category_id", "createdAt", "description", "id", "name", "price", "stock", "store_id", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_ProductRatings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductRatings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProductRatings_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductRatings" ("comment", "createdAt", "id", "product_id", "rating", "updatedAt", "user_id") SELECT "comment", "createdAt", "id", "product_id", "rating", "updatedAt", "user_id" FROM "ProductRatings";
DROP TABLE "ProductRatings";
ALTER TABLE "new_ProductRatings" RENAME TO "ProductRatings";
CREATE TABLE "new_RatingComments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "store_rating_id" INTEGER,
    "product_rating_id" INTEGER,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RatingComments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RatingComments_store_rating_id_fkey" FOREIGN KEY ("store_rating_id") REFERENCES "StoreRating" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RatingComments_product_rating_id_fkey" FOREIGN KEY ("product_rating_id") REFERENCES "ProductRatings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RatingComments" ("content", "createdAt", "id", "product_rating_id", "store_rating_id", "updatedAt", "user_id") SELECT "content", "createdAt", "id", "product_rating_id", "store_rating_id", "updatedAt", "user_id" FROM "RatingComments";
DROP TABLE "RatingComments";
ALTER TABLE "new_RatingComments" RENAME TO "RatingComments";
CREATE TABLE "new_StoreRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StoreRating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StoreRating_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StoreRating" ("comment", "createdAt", "id", "rating", "store_id", "updatedAt", "user_id") SELECT "comment", "createdAt", "id", "rating", "store_id", "updatedAt", "user_id" FROM "StoreRating";
DROP TABLE "StoreRating";
ALTER TABLE "new_StoreRating" RENAME TO "StoreRating";
CREATE TABLE "new_Stores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logo_url" TEXT,
    "banner_url" TEXT,
    "sticker_url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Stores_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stores" ("banner_url", "category_id", "createdAt", "description", "id", "logo_url", "name", "sticker_url", "updatedAt", "user_id") SELECT "banner_url", "category_id", "createdAt", "description", "id", "logo_url", "name", "sticker_url", "updatedAt", "user_id" FROM "Stores";
DROP TABLE "Stores";
ALTER TABLE "new_Stores" RENAME TO "Stores";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
