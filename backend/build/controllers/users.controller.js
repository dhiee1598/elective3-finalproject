"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeAuthenticateUsers = exports.AuthorizeUser = exports.AuthenticateUsers = exports.RegisterUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const users_service_1 = require("../services/users.service");
const password_utils_1 = require("../utilities/password.utils");
const generate_token_1 = require("../utilities/generate.token");
const store_cookie_1 = __importDefault(require("../utilities/store.cookie"));
exports.RegisterUsers = (0, express_async_handler_1.default)(async (req, res) => {
    const users = await (0, users_service_1.GetUsersByEmail)(req.body.email);
    // * Check if the email address is already taken
    if (users) {
        res.status(409);
        // ! Throw Error if email address is already taken
        throw new Error("Email address is already taken");
    }
    const hashPass = await (0, password_utils_1.HashPassword)(req.body.password);
    // * Create a new user
    const newUsers = await (0, users_service_1.InsertUsers)({ ...req.body, password: hashPass });
    // * Respond with message and newly created user data
    res.status(201).json({
        message: "New users created successfully",
        users: newUsers,
    });
});
exports.AuthenticateUsers = (0, express_async_handler_1.default)(async (req, res) => {
    const users = await (0, users_service_1.GetUsersByEmail)(req.body.email);
    // * Check if user is authorize
    if (!users) {
        res.status(401);
        throw new Error("Email or password does not match");
    }
    if (!(await (0, password_utils_1.IsValidPassword)(req.body.password, users.password))) {
        res.status(401);
        throw new Error("Email or password does not match");
    }
    // * Generate access and refresh tokens for the authenticated user
    const accessToken = (0, generate_token_1.GenerateAccessToken)(users.userId);
    const refreshToken = (0, generate_token_1.GenerateRefreshToken)(users.userId);
    // * Store the refresh token in an HTTP-only cookie
    (0, store_cookie_1.default)(res, "refreshToken", refreshToken);
    // * Respond with a message and the user. And also the generated access token
    res.status(200).json({
        message: "Users successfully authenticated",
        users: users,
        accessToken: accessToken,
    });
});
exports.AuthorizeUser = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.userId;
    const users = await (0, users_service_1.GetUsersById)(id);
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
exports.DeAuthenticateUsers = (0, express_async_handler_1.default)(async (_req, res) => {
    // * Clear the stored refresh token cookie
    res.clearCookie("refreshToken");
    // * Send a success status indicating successful logout
    res.sendStatus(200);
});
