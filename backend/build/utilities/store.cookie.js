"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
// * Store a cookie with the specified name and value in the response
const StoreCookieToken = (res, name, value) => {
    return res.cookie(name, value, {
        httpOnly: true, // Ensure the cookie is accessible only via HTTP(S) and not client-side JavaScript
        expires: new Date(Date.now() + env_1.default.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000),
    });
};
exports.default = StoreCookieToken;
