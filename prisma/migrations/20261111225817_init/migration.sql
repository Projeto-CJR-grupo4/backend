-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "profile_picture_url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PasswordReset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "parent_category_id" INTEGER,
    CONSTRAINT "Categories_parent_category_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "Categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stores" (
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
    CONSTRAINT "Stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stores_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "store_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductImages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "ProductImages_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StoreRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StoreRating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StoreRating_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductRatings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductRatings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductRatings_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RatingComments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "store_rating_id" INTEGER,
    "product_rating_id" INTEGER,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RatingComments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RatingComments_store_rating_id_fkey" FOREIGN KEY ("store_rating_id") REFERENCES "StoreRating" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RatingComments_product_rating_id_fkey" FOREIGN KEY ("product_rating_id") REFERENCES "ProductRatings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
