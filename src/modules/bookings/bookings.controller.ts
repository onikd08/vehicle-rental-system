import { Request, Response } from "express";
import { bookingServices } from "./bookings.service";
import sendJson from "../../helper/sendJson";
import { JwtPayload } from "jsonwebtoken";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(
      req.body,
      req.user as JwtPayload
    );
    const data = {
      success: true,
      message: "Booking created successfully",
      data: result,
    };
    sendJson(res, data, 201);
  } catch (error: any) {
    const data = {
      success: false,
      message: "Failed to create booking",
      error: error.message,
    };
    sendJson(res, data, 500);
  }
};

const updateBooking = async (req: Request, res: Response) => {};

const getAllBookings = async (req: Request, res: Response) => {};

export const bookingController = {
  createBooking,
  updateBooking,
  getAllBookings,
};
