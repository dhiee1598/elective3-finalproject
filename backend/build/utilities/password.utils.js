"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidPassword = exports.HashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
// Function to hash a password
const HashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        return hashedPassword;
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Hashing password failed.");
    }
};
exports.HashPassword = HashPassword;
// Function to compare a password with its hash
const IsValidPassword = async (password, hashPass) => {
    try {
        const isValid = await bcrypt_1.default.compare(password, hashPass);
        return isValid;
    }
    catch (error) {
        throw new Error(error instanceof Error
            ? error.message
            : "Comparing password hash failed.");
    }
};
exports.IsValidPassword = IsValidPassword;
