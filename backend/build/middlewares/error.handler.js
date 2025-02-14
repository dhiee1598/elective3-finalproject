"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.NotFound = void 0;
const env_1 = __importDefault(require("../utilities/env"));
const NotFound = (req, res, next) => {
    // * Set HTTP status code to 404 (Not Found)
    res.status(404);
    // * Create a new Error object with a message indicating the URL that was not found
    const error = new Error(`Route not found: ${req.originalUrl}`);
    // * Pass the error to the next middleware to handle
    next(error);
};
exports.NotFound = NotFound;
const ErrorHandler = (error, _req, res, _next) => {
    // * Determine the HTTP status code to send in the response
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    // * Set the HTTP status code of the response
    res.status(statusCode);
    // * Send an error response with the error message and stack trace (in development)
    res.json({
        message: error.message,
        stacks: env_1.default.NODE_ENV === "production" ? "🍪" : error.stack,
    });
};
exports.ErrorHandler = ErrorHandler;
