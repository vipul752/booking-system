-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pending', 'confirmed', 'cancelled', 'expired');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'success', 'failed', 'refunded');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rooms" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_bookingId_key" ON "Payments"("bookingId");

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
