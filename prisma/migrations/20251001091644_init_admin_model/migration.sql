/*
  Warnings:

  - You are about to drop the column `is_super_admin` on the `Admin` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "is_super_admin",
ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'ADMIN';
