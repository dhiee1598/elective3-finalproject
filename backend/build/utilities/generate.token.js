"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateRefreshToken = exports.GenerateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("./env"));
// * Function to generate an access token for a given user ID
const GenerateAccessToken = (id) => {
    return jsonwebtoken_1.default.sign({ userId: id }, env_1.default.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};
exports.GenerateAccessToken = GenerateAccessToken;
// * Function to generate a refresh token for a given user ID
const GenerateRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({ userId: id }, env_1.default.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
exports.GenerateRefreshToken = GenerateRefreshToken;
