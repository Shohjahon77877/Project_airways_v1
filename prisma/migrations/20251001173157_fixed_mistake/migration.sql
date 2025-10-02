/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `LoyaltyProgram` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LoyaltyProgram_user_id_key" ON "LoyaltyProgram"("user_id");
