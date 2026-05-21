import type { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import sendResponse from "../../utility/sendResponse";
import AppError from "../../utility/AppError";
import jwt from "jsonwebtoken";
import { config } from "../../config";

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
  const { email, password } = req.body;

  const user = await authService.validateUser(email, password);
  console.log("user", user);

  if (!user) {
    throw new AppError(401, "email & password Wrong!");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = await jwt.sign(jwtPayload, config.secret, {
    expiresIn: "1h",
  });

  const refreshToken = await jwt.sign(jwtPayload, config.refresh_secret, {
    expiresIn: "7d",
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Login successfully",
    data: { accessToken, refreshToken },
  });
};
