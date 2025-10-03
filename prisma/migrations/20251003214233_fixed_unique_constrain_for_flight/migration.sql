/*
  Warnings:

  - A unique constraint covering the columns `[seat_id]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Ticket_flight_id_seat_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_seat_id_key" ON "Ticket"("seat_id");
