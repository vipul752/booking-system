# Booking System Backend

A Node.js and Express backend for a hotel booking system. The project manages hotels, rooms, users, bookings, and payments through a REST API backed by Prisma and PostgreSQL.

## Overview

This backend is built to support a booking workflow where users can browse hotels, inspect available rooms, create bookings, make payments, confirm reservations, and request refunds when needed. The data layer is handled by Prisma, which provides type-safe database access for all core entities.

## Features

- Create, read, update, and delete hotels
- Create, read, update, and delete rooms
- Register users and fetch user profiles
- Create bookings for rooms and view bookings by user
- Confirm or cancel bookings
- Make payments for bookings and issue refunds
- Fetch payments by payment id or booking id

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- dotenv
- nodemon

## Project Structure

```text
backend/
├── db.js
├── package.json
├── prisma/
│   └── schema.prisma
└── src/
		├── index.js
		├── controllers/
		│   ├── booking.controllers.js
		│   ├── hotel.controllers.js
		│   ├── payment.controllers.js
		│   ├── room.controllers.js
		│   └── user.controllers.js
		└── routes/
				├── booking.routes.js
				├── hotel.routes.js
				├── payment.routes.js
				├── room.routes.js
				└── user.routes.js
```

## Data Models

The Prisma schema includes these models:

- `User` - stores user information
- `Hotels` - stores hotel details
- `Rooms` - stores rooms linked to a hotel
- `Bookings` - stores room bookings made by users
- `Payments` - stores payment records for bookings

## API Routes

Base URL: `http://localhost:8001`

### Hotels

- `POST /v1/hotels` - create a hotel
- `GET /v1/hotels` - list all hotels
- `GET /v1/hotels/:id` - get a hotel by id
- `PUT /v1/hotels/:id` - update a hotel
- `DELETE /v1/hotels/:id` - delete a hotel

### Users

- `POST /v1/users` - create a user
- `GET /v1/users/:id` - get a user by id

### Rooms

- `POST /v1/rooms` - create a room
- `GET /v1/rooms` - list all rooms
- `GET /v1/rooms/:id` - get a room by id
- `GET /v1/rooms/hotel/:hotelId` - list rooms for a hotel
- `PUT /v1/rooms/:id` - update a room
- `DELETE /v1/rooms/:id` - delete a room

### Bookings

- `POST /v1/bookings` - create a booking
- `GET /v1/bookings/:id` - get a booking by id
- `GET /v1/bookings/user/:userId` - list bookings for a user
- `PUT /v1/bookings/:id/confirm` - confirm a booking
- `DELETE /v1/bookings/:id/cancel` - cancel a booking

### Payments

- `POST /v1/payments` - create a payment for a booking
- `GET /v1/payments/:id` - get a payment by id
- `GET /v1/payments/booking/:bookingId` - list payments for a booking
- `POST /v1/payments/:id/refund` - refund a payment
- `POST /v1/payments/test-double-payment` - test duplicate payment protection

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the `backend` folder and add your database connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
PORT=8001
```

### 3. Generate Prisma client

```bash
npx prisma generate
```

### 4. Sync the schema with the database

```bash
npx prisma db push
```

If you prefer migrations, use:

```bash
npx prisma migrate dev
```

### 5. Start the server

```bash
npm start
```

## Example Requests

### Create a hotel

```bash
curl -X POST http://localhost:8001/v1/hotels \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Ocean View Hotel",
		"description": "Beachfront property with premium rooms",
		"location": "Goa"
	}'
```

### Create a booking

```bash
curl -X POST http://localhost:8001/v1/bookings \
	-H "Content-Type: application/json" \
	-d '{
		"userId": "user-id-here",
		"roomId": "room-id-here",
		"startDate": "2026-06-20T00:00:00.000Z",
		"endDate": "2026-06-22T00:00:00.000Z"
	}'
```

### Make a payment

```bash
curl -X POST http://localhost:8001/v1/payments \
	-H "Content-Type: application/json" \
	-d '{
		"bookingId": "booking-id-here",
		"amount": 2000
	}'
```

## Notes

- The project uses UUID string ids in the Prisma schema.
- Booking and payment status values should match the Prisma enum values in `prisma/schema.prisma`.
- `bookingId` and related ids should be passed as strings, not numbers.

## License

This project currently does not include a license.
