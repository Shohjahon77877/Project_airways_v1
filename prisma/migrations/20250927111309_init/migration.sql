-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_super_admin" BOOLEAN NOT NULL,
    "created_by" INTEGER NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published_by_admin_id" INTEGER NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

-- AddForeignKey
ALTER TABLE "public"."News" ADD CONSTRAINT "News_published_by_admin_id_fkey" FOREIGN KEY ("published_by_admin_id") REFERENCES "public"."Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
