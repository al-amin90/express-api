import type { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import sendResponse from "../../utility/sendResponse";
import AppError from "../../utility/AppError";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../../config";
import type { User } from "../../types";

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

  res.cookie("refreshToken", refreshToken, {
    sameSite: "lax",
    httpOnly: true,
    secure: false,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Login successfully",
    data: { accessToken, refreshToken },
  });
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.refreshToken;

  console.log("token", token);

  if (!token) {
    throw new AppError(401, "Sent me Token!!!");
  }

  const verifyToken = (await jwt.verify(
    token,
    config.refresh_secret,
  )) as JwtPayload;

  console.log("verifyToken", verifyToken);

  const userData = await authService.getUser(verifyToken.id);

  if (userData.length === 0) {
    throw new AppError(401, "User Not Found!");
  }

  const user = userData[0] as User;

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = await jwt.sign(jwtPayload, config.secret, {
    expiresIn: "1h",
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Token Generate successfully",
    data: { accessToken },
  });
};
