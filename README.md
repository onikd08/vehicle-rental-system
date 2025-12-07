# Vehicle Rental System

The Vehicle Rental System API is a backend service built using Node.js, Express, TypeScript, and PostgreSQL (pg).
It allows customers to browse and book vehicles, and allows admins to manage users, vehicles, and booking statuses.

## 🚀 Features

### 👤 User Management

- Register & Login with JWT Authentication
- Update personal profile
- Admin can update any user
- Customers can only update themselves
- Role-based permissions (admin, customer)

### 🚗 Vehicle Management

- Add, update, delete vehicles (admin only)
- View all vehicles in the system

### 📅 Booking Management

- Customers can book vehicles
- Prevent booking vehicles that are already booked
- Customer can cancel only before start date
- Admin can mark booking as returned
- Vehicle availability updates automatically
- Auto-return logic support after rental period is expired (handled at get all vehicles api)

## 🛠️ Tech Stack

| Layer          | Technology                             |
| -------------- | -------------------------------------- |
| Runtime        | Node.js                                |
| Language       | TypeScript                             |
| Framework      | Express.js                             |
| Database       | PostgreSQL                             |
| ORM/Driver     | pg                                     |
| Authentication | JWT                                    |
| Validation     | Custom checks + PostgreSQL constraints |
| Hashing        | bcryptjs                               |

## 🗄️ Database Schema

#### Users:

| Column   | Type         | Constraints         |
| -------- | ------------ | ------------------- |
| id       | SERIAL       | PK                  |
| name     | VARCHAR(150) | NOT NULL            |
| email    | VARCHAR(150) | UNIQUE, lowercase   |
| password | VARCHAR(150) | min 6 chars         |
| phone    | VARCHAR(20)  | NOT NULL            |
| role     | VARCHAR(20)  | `admin`, `customer` |

#### Vehicles:

| Column              | Type         | Constraints                 |
| ------------------- | ------------ | --------------------------- |
| id                  | SERIAL       | PK                          |
| vehicle_name        | VARCHAR(255) | NOT NULL                    |
| type                | VARCHAR(10)  | `car`, `bike`, `van`, `SUV` |
| registration_number | VARCHAR(50)  | UNIQUE NOT NULL             |
| daily_rent_price    | INT          | > 0                         |
| availability_status | VARCHAR(20)  | `available`, `booked`       |

#### Bookings:

| Column          | Type        | Constraints                      |
| --------------- | ----------- | -------------------------------- |
| id              | SERIAL      | PK                               |
| customer_id     | INT         | FK → users(id)                   |
| vehicle_id      | INT         | FK → vehicles(id)                |
| rent_start_date | DATE        | NOT NULL                         |
| rent_end_date   | DATE        | > start date                     |
| total_price     | INT         | > 0                              |
| status          | VARCHAR(20) | `active`, `canceled`, `returned` |

## 📦 Installation & Setup

#### Clone the repo

```bash
  git clone https://github.com/onikd08/vehicle-rental-system.git
  cd vehicle-rental-system
```

#### Install dependencies

```bash
npm install
```

#### Create .env File

```bash
PORT=8000
JWT_SECRET=your_jwt_secret
CONNECTION_STRING=your_database_url
```

#### Run database migration (auto create tables)

Tables are created at server start via initDB().

#### Start the server

```bash
npm run dev
```

## 🔐 Authentication and Authorization

#### User Roles

- Admin - Full system access to manage vehicles, users and all bookings
- Customer - Can register, view vehicles, create/manage own bookings

#### Authentication Flow

- Passwords are hashed using bcryptjs before storage into the database
- After login receives a JWT (JSON Web Token)
- Protected endpoints require token in header: Authorization: Bearer <token>
- Validates the token and checks user permissions
- Access granted if authorized, otherwise returns 401 (Unauthorized) or 403 (Forbidden)

## API Reference

```bash
baseURL: http://localhost:8000/api/v1
```

#### Authentication

| Method | Endpoint              | Access | Description                 |
| ------ | --------------------- | ------ | --------------------------- |
| POST   | `/api/v1/auth/signup` | Public | Register new user account   |
| POST   | `/api/v1/auth/signin` | Public | Login and receive JWT token |

---

#### Vehicles

| Method | Endpoint                      | Access     | Description                                                                             |
| ------ | ----------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| POST   | `/api/v1/vehicles`            | Admin only | Add new vehicle with name, type, registration, daily rent price and availability status |
| GET    | `/api/v1/vehicles`            | Public     | View all vehicles in the system                                                         |
| GET    | `/api/v1/vehicles/:vehicleId` | Public     | View specific vehicle details                                                           |
| PUT    | `/api/v1/vehicles/:vehicleId` | Admin only | Update vehicle details, daily rent price or availability status                         |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin only | Delete vehicle (only if no active bookings exist)                                       |

---

#### Users

| Method | Endpoint                | Access       | Description                                                                   |
| ------ | ----------------------- | ------------ | ----------------------------------------------------------------------------- |
| GET    | `/api/v1/users`         | Admin only   | View all users in the system                                                  |
| PUT    | `/api/v1/users/:userId` | Admin or Own | Admin: Update any user's role or details<br>Customer: Update own profile only |
| DELETE | `/api/v1/users/:userId` | Admin only   | Delete user (only if no active bookings exist)                                |

---

#### Bookings

| Method | Endpoint                      | Access            | Description                                                                                                                                                         |
| ------ | ----------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/v1/bookings`            | Customer or Admin | Create booking with start/end dates<br>• Validates vehicle availability<br>• Calculates total price (daily rate × duration)<br>• Updates vehicle status to "booked" |
| GET    | `/api/v1/bookings`            | Role-based        | Admin: View all bookings<br>Customer: View own bookings only                                                                                                        |
| PUT    | `/api/v1/bookings/:bookingId` | Role-based        | Customer: Cancel booking (before start date only)<br>Admin: Mark as "returned" (updates vehicle to "available")<br>System: Auto-mark as "returned" when period ends |

---

## 📁 Project Structure

```bash
src/
 ├── config/
 │    └── db.ts
 |    └── index.ts
 │
 ├── middleware/
 │    └── auth.ts
 |
 ├── modules/
 │    ├── auth/
 │    ├── users/
 │    ├── vehicles/
 │    └── bookings/
 |
 ├── helper/
 │    └── calculateBookingPrice.ts
 │    └── sendJson.ts
 │    └── autoReturnExpiredBookings.ts
 |
 ├── types/
 │    └── index.d.ts
 |
 ├── app.ts
 └── server.ts

```

## Live Deployment

```bash
https://vehicle-rental-system-psi.vercel.app/
```
