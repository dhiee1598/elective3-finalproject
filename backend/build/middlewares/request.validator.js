"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateNewBlogs = exports.ValidateAuthUser = exports.ValidateNewUser = void 0;
const express_validator_1 = require("express-validator");
exports.ValidateNewUser = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("Field name is required")
        .isString()
        .withMessage("Field name must be a string")
        .isLength({ min: 3, max: 30 })
        .withMessage("Field name must be between 3 and 30 characters"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Field email is required")
        .isEmail()
        .withMessage("Field email is an invalid email address"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Field password is required")
        .isLength({ min: 3, max: 30 })
        .withMessage("Field password must be between 3 and 30 characters"),
    (req, res, next) => {
        const allowedFields = ["name", "email", "password"];
        const receiveFields = Object.keys(req.body);
        // * Check for unexpected fields
        const extraFields = receiveFields.filter((field) => !allowedFields.includes(field));
        if (extraFields.length > 0) {
            res.status(400);
            // ! Throw Error for unexpected fields
            throw new Error(`Unexpected field: '${extraFields[0]}'`);
        }
        // * Check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const firstError = errors.array()[0].msg;
            res.status(400);
            // ! Throw Error for validation errors
            throw new Error(firstError);
        }
        // * Proceed to the next middleware if no errors
        next();
    },
];
exports.ValidateAuthUser = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Field email is required")
        .isEmail()
        .withMessage("Field email is an invalid email address"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Field password is required")
        .isLength({ min: 3, max: 30 })
        .withMessage("Field password must be between 3 and 30 characters"),
    (req, res, next) => {
        const allowedFields = ["email", "password"];
        const receiveFields = Object.keys(req.body);
        // * Check for unexpected fields
        const extraFields = receiveFields.filter((field) => !allowedFields.includes(field));
        if (extraFields.length > 0) {
            res.status(400);
            // ! Throw Error for unexpected fields
            throw new Error(`Unexpected field: '${extraFields[0]}'`);
        }
        // * Check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const firstError = errors.array()[0].msg;
            res.status(400);
            // ! Throw Error for validation errors
            throw new Error(firstError);
        }
        // * Proceed to the next middleware if no errors
        next();
    },
];
exports.ValidateNewBlogs = [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Field title is required"),
    (0, express_validator_1.body)("content").notEmpty().withMessage("Field content is required"),
    (0, express_validator_1.body)("blogType").notEmpty().withMessage("Field blog type is required"),
    (req, res, next) => {
        const allowedFields = ["title", "content", "blogType"];
        const receiveFields = Object.keys(req.body);
        // * Check for unexpected fields
        const extraFields = receiveFields.filter((field) => !allowedFields.includes(field));
        if (extraFields.length > 0) {
            res.status(400);
            // ! Throw Error for unexpected fields
            throw new Error(`Unexpected field: '${extraFields[0]}'`);
        }
        // * Check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const firstError = errors.array()[0].msg;
            res.status(400);
            // ! Throw Error for validation errors
            throw new Error(firstError);
        }
        // * Proceed to the next middleware if no errors
        next();
    },
];
