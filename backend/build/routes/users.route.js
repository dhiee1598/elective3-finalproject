"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = require("../controllers/users.controller");
const express_1 = require("express");
const request_validator_1 = require("../middlewares/request.validator");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
// * Description:    Create a new user
// * Route:          POST /api/users/auth/sign-up
// * Access:         Public
router.post("/auth/sign-up", request_validator_1.ValidateNewUser, users_controller_1.RegisterUsers);
// * Description:    Authenticate a user
// * Route:          POST /api/users/auth/sign-in
// * Access:         Public
router.post("/auth/sign-in", request_validator_1.ValidateAuthUser, users_controller_1.AuthenticateUsers);
// * Description:    Authorize users
// * Route:          GET /api/users
// * Access:         Private
router.get("/", auth_1.default, users_controller_1.AuthorizeUser);
// * Description:    Deauthorize a user
// * Route:          POST /api/users/auth/sign-out
// * Access:         Private
router.post("/auth/sign-out", auth_1.default, users_controller_1.DeAuthenticateUsers);
exports.default = router;
