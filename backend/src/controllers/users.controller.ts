import { RequestHandler } from "express";
import { UsersNewRequest, UsersResponse } from "../interfaces/users.props";
import asyncHandler from "express-async-handler";
import { GetUsersByEmail, InsertUsers } from "../services/users.service";
import { HashPassword } from "../utilities/password.utils";

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
