import type { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import sendResponse from "../../utility/sendResponse";
import AppError from "../../utility/AppError";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password, age, role } = req.body;

  const user = await authService.createUser({
    name,
    email,
    password,
    age,
    role,
  });

  if (!user) {
    throw new AppError(400, "Failed to create user");
  }

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: user,
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password, age, role } = req.body;

  const user = await authService.createUser({
    name,
    email,
    password,
    age,
    role,
  });

  if (!user) {
    throw new AppError(400, "Failed to create user");
  }

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: user,
  });
};
