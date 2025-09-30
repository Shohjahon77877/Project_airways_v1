/*
  Warnings:

  - Made the column `last_login` on table `Admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `published_at` on table `News` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."Extra_Detail" AS ENUM ('EXIT_ROW', 'WINDOW_SEAT');

-- CreateEnum
CREATE TYPE "public"."Ticket_status" AS ENUM ('PURCHASED', 'CANCELED');

-- CreateEnum
CREATE TYPE "public"."Loyalt_Program_Rank" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- CreateEnum
CREATE TYPE "public"."Flight_Status" AS ENUM ('SCHEDULED', 'BOARDING', 'IN_AIR', 'DELAYED', 'CANCELLED', 'LANDED');

-- AlterTable
ALTER TABLE "public"."Admin" ALTER COLUMN "last_login" SET NOT NULL,
ALTER COLUMN "last_login" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."News" ALTER COLUMN "published_at" SET NOT NULL,
ALTER COLUMN "published_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."Classes" (
    "id" SERIAL NOT NULL,
    "class_name" TEXT NOT NULL,
    "base_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Seats" (
    "id" SERIAL NOT NULL,
    "plane_id" INTEGER NOT NULL,
    "seat_number" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "extra_detail" "public"."Extra_Detail",
    "extra_fee" DECIMAL(10,2),

    CONSTRAINT "Seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ticket" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "flight_id" INTEGER NOT NULL,
    "seat_id" INTEGER NOT NULL,
    "is_round_trip" BOOLEAN NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(65,30) NOT NULL,
    "ticket_status" "public"."Ticket_status" NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LoyaltyProgram" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "level" "public"."Loyalt_Program_Rank" NOT NULL,

    CONSTRAINT "LoyaltyProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reviews" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "flight_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Planes" (
    "id" SERIAL NOT NULL,
    "model_name" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,
    "total_seats" INTEGER NOT NULL,

    CONSTRAINT "Planes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Flights" (
    "id" SERIAL NOT NULL,
    "flight_number" INTEGER NOT NULL,
    "plane_id" INTEGER NOT NULL,
    "arrival_airport_id" INTEGER NOT NULL,
    "departure_airport_id" INTEGER NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "status" "public"."Flight_Status" NOT NULL,

    CONSTRAINT "Flights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Airports" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "Airports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_flight_id_seat_id_key" ON "public"."Ticket"("flight_id", "seat_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- CreateIndex
CREATE INDEX "Flights_plane_id_idx" ON "public"."Flights"("plane_id");

-- CreateIndex
CREATE INDEX "Flights_arrival_airport_id_idx" ON "public"."Flights"("arrival_airport_id");

-- CreateIndex
CREATE INDEX "Flights_departure_airport_id_idx" ON "public"."Flights"("departure_airport_id");

-- CreateIndex
CREATE UNIQUE INDEX "Airports_code_key" ON "public"."Airports"("code");

-- AddForeignKey
ALTER TABLE "public"."Seats" ADD CONSTRAINT "Seats_plane_id_fkey" FOREIGN KEY ("plane_id") REFERENCES "public"."Planes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Seats" ADD CONSTRAINT "Seats_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "public"."Flights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "public"."Seats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LoyaltyProgram" ADD CONSTRAINT "LoyaltyProgram_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reviews" ADD CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reviews" ADD CONSTRAINT "Reviews_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "public"."Flights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Planes" ADD CONSTRAINT "Planes_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Flights" ADD CONSTRAINT "Flights_plane_id_fkey" FOREIGN KEY ("plane_id") REFERENCES "public"."Planes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Flights" ADD CONSTRAINT "Flights_departure_airport_id_fkey" FOREIGN KEY ("departure_airport_id") REFERENCES "public"."Airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Flights" ADD CONSTRAINT "Flights_arrival_airport_id_fkey" FOREIGN KEY ("arrival_airport_id") REFERENCES "public"."Airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Airports" ADD CONSTRAINT "Airports_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "public"."City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."City" ADD CONSTRAINT "City_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "public"."Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
