import { RequestHandler } from "express";
import {
  UsersAuthRequest,
  UsersNewRequest,
  UsersResponse,
} from "../interfaces/users.props";
import asyncHandler from "express-async-handler";
import {
  GetUsersByEmail,
  GetUsersById,
  InsertUsers,
} from "../services/users.service";
import { HashPassword, IsValidPassword } from "../utilities/password.utils";
import {
  GenerateAccessToken,
  GenerateRefreshToken,
} from "../utilities/generate.token";
import StoreCookieToken from "../utilities/store.cookie";

export const RegisterUsers: RequestHandler<
  unknown,
  UsersResponse,
  UsersNewRequest,
  unknown
> = asyncHandler(async (req, res) => {
  const users = await GetUsersByEmail(req.body.email);

  // * Check if the email address is already taken
  if (users) {
    res.status(409);
    // ! Throw Error if email address is already taken
    throw new Error("Email address is already taken");
  }

  const hashPass = await HashPassword(req.body.password);

  // * Create a new user
  const newUsers = await InsertUsers({ ...req.body, password: hashPass });

  // * Respond with message and newly created user data
  res.status(201).json({
    message: "New users created successfully",
    users: newUsers,
  });
});

export const AuthenticateUsers: RequestHandler<
  unknown,
  UsersResponse,
  UsersAuthRequest,
  unknown
> = asyncHandler(async (req, res) => {
  const users = await GetUsersByEmail(req.body.email);

  // * Check if user is authorize
  if (!users) {
    res.status(401);
    throw new Error("Email or password does not match");
  }

  if (!(await IsValidPassword(req.body.password, users.password))) {
    res.status(401);
    throw new Error("Email or password does not match");
  }

  // * Generate access and refresh tokens for the authenticated user
  const accessToken = GenerateAccessToken(users.userId);
  const refreshToken = GenerateRefreshToken(users.userId);

  // * Store the refresh token in an HTTP-only cookie
  StoreCookieToken(res, "refreshToken", refreshToken);

  // * Respond with a message and the user. And also the generated access token
  res.status(200).json({
    message: "Users successfully authenticated",
    users: users,
    accessToken: accessToken,
  });
});

export const AuthorizeUser: RequestHandler<
  unknown,
  UsersResponse,
  unknown,
  unknown
> = asyncHandler(async (req, res) => {
  const id = req.userId;

  const users = await GetUsersById(id);

  if (!users) {
    res.status(401);
    // ! Throw Error if user not found
    throw new Error("Users not found");
  }

  // * Respond with the fetched user details
  res.status(200).json({
    message: "Authorize users",
    users: users,
  });
});

export const DeAuthenticateUsers: RequestHandler = asyncHandler(
  async (_req, res) => {
    // * Clear the stored refresh token cookie
    res.clearCookie("refreshToken");

    // * Send a success status indicating successful logout
    res.sendStatus(200);
  },
);
