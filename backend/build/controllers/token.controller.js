"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshAccessToken = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const generate_token_1 = require("../utilities/generate.token");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../utilities/env"));
exports.RefreshAccessToken = (0, express_async_handler_1.default)(async (req, res) => {
    // * Retrieve the refresh token from the request cookies
    const refreshToken = req.cookies.refreshToken;
    // * If no refresh token cookie, respond with a 401 error
    if (!refreshToken) {
        res.status(401);
        // ! Throw an error indicating the refresh token is missing
        throw new Error("Missing refresh token in the cookie.");
    }
    // * Verify the refresh token using the provided secret
    jsonwebtoken_1.default.verify(refreshToken, env_1.default.REFRESH_TOKEN_SECRET, (err, decoded) => {
        // * If there is an error, respond with a 403 error
        if (err) {
            res.status(403);
            // ! Throw an error indicating the refresh token is invalid
            throw new Error("The provided token is invalid.");
        }
        // * If refresh token is valid, generate a new access token using the decoded userId
        const user = decoded;
        const newAccessToken = (0, generate_token_1.GenerateAccessToken)(user.userId);
        // * Send the new access token in the response with message
        res.status(200).json({
            message: "New access token generated.",
            accessToken: newAccessToken,
        });
    });
});
