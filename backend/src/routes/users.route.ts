import {
  AuthenticateUsers,
  AuthorizeUser,
  DeAuthenticateUsers,
  ModifyUsersInfo,
  RegisterUsers,
} from "../controllers/users.controller";
import { Router } from "express";
import {
  ValidateAuthUser,
  ValidateNewUser,
  ValidateUsersUpdateInfo,
} from "../middlewares/request.validator";

import RequiredAuthentication from "../middlewares/auth";

const router = Router();

// * Description:    Create a new user
// * Route:          POST /api/users/auth/sign-up
// * Access:         Public
router.post("/auth/sign-up", ValidateNewUser, RegisterUsers);

// * Description:    Authenticate a user
// * Route:          POST /api/users/auth/sign-in
// * Access:         Public
router.post("/auth/sign-in", ValidateAuthUser, AuthenticateUsers);

// * Description:    Authorize users
// * Route:          GET /api/users
// * Access:         Private
router.get("/", RequiredAuthentication, AuthorizeUser);

// * Description:    Deauthorize a user
// * Route:          POST /api/users/auth/sign-out
// * Access:         Private
router.post("/auth/sign-out", RequiredAuthentication, DeAuthenticateUsers);

// * Description:    Update a user
// * Route:          PUT /api/users/:userId
// * Access:         Private
router.put(
  "/:userId",
  RequiredAuthentication,
  ValidateUsersUpdateInfo,
  ModifyUsersInfo,
);

export default router;
