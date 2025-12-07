import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";
import calculateBookingPrice from "../../helper/calculateBookingPrice";

const createBooking = async (
  payload: Record<string, unknown>,
  loggedInUser: JwtPayload
) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const customer = await pool.query(`SELECT * FROM users WHERE id = $1`, [
    customer_id,
  ]);

  if (loggedInUser.id != customer.rows[0].id) {
    throw new Error("You are not authorized to book vehicles for other users");
  }

  const vehicle = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [
    vehicle_id,
  ]);

  if (vehicle.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const { vehicle_name, daily_rent_price, availability_status } =
    vehicle.rows[0];

  if (availability_status !== "available") {
    throw new Error("Vehicle is not available for booking");
  }

  const total_price = calculateBookingPrice(
    rent_start_date as string,
    rent_end_date as string,
    daily_rent_price as number
  );

  const result = await pool.query(
    `
        INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
    `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      "active",
    ]
  );

  console.log(result.rows[0]);

  const updateVehicleStatus = await pool.query(
    `   
        UPDATE vehicles SET availability_status = 'booked' WHERE id = $1
    `,
    [vehicle_id]
  );

  const data = {
    ...result.rows[0],
    rent_start_date,
    rent_end_date,
    vehicle: {
      vehicle_name,
      daily_rent_price,
    },
  };
  console.log(data);
  return data;
};

const updateBooking = async () => {};

const getAllBookings = async () => {};

export const bookingServices = {
  createBooking,
  updateBooking,
  getAllBookings,
};
