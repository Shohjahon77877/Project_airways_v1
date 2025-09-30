-- AlterTable
ALTER TABLE "public"."Admin" ALTER COLUMN "is_super_admin" DROP NOT NULL,
ALTER COLUMN "created_by" DROP NOT NULL,
ALTER COLUMN "last_login" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."News" ALTER COLUMN "published_at" DROP NOT NULL;
