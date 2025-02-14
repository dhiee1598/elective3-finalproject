"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../utilities/env"));
const RequiredAuthentication = (0, express_async_handler_1.default)(async (req, res, next) => {
    // * Extract access token from Authorization header
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    // * Check if access token exists
    if (!accessToken) {
        res.status(401);
        // ! Throw Error if access token is missing
        throw new Error("Authorization header with token is required.");
    }
    // * Verify the access token using the secret key
    jsonwebtoken_1.default.verify(accessToken, env_1.default.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                res.status(401);
                // ! Throw Error if token expired
                throw new Error("The provided token has expired.");
            }
            res.status(403);
            // ! Throw Error if token verification fails
            throw new Error("The provided token is invalid.");
        }
        const user = decoded;
        // * Store the decoded user ID in the request object for further use
        req.userId = user.userId;
        next();
    });
});
exports.default = RequiredAuthentication;
