import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const ValidateNewUser = [
  body("name")
    .notEmpty()
    .withMessage("Field name is required")
    .isString()
    .withMessage("Field name must be a string")
    .isLength({ min: 3, max: 30 })
    .withMessage("Field name must be between 3 and 30 characters"),
  body("email")
    .notEmpty()
    .withMessage("Field email is required")
    .isEmail()
    .withMessage("Field email is an invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Field password is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Field password must be between 3 and 30 characters"),
  (req: Request, res: Response, next: NextFunction) => {
    const allowedFields = ["name", "email", "password"];
    const receiveFields = Object.keys(req.body);

    // * Check for unexpected fields
    const extraFields = receiveFields.filter(
      (field) => !allowedFields.includes(field),
    );

    if (extraFields.length > 0) {
      res.status(400);
      // ! Throw Error for unexpected fields
      throw new Error(`Unexpected field: '${extraFields[0]}'`);
    }

    // * Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg as string;

      res.status(400);
      // ! Throw Error for validation errors
      throw new Error(firstError);
    }

    // * Proceed to the next middleware if no errors
    next();
  },
];

export const ValidateAuthUser = [
  body("email")
    .notEmpty()
    .withMessage("Field email is required")
    .isEmail()
    .withMessage("Field email is an invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Field password is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Field password must be between 3 and 30 characters"),
  (req: Request, res: Response, next: NextFunction) => {
    const allowedFields = ["email", "password"];
    const receiveFields = Object.keys(req.body);

    // * Check for unexpected fields
    const extraFields = receiveFields.filter(
      (field) => !allowedFields.includes(field),
    );

    if (extraFields.length > 0) {
      res.status(400);
      // ! Throw Error for unexpected fields
      throw new Error(`Unexpected field: '${extraFields[0]}'`);
    }

    // * Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg as string;

      res.status(400);
      // ! Throw Error for validation errors
      throw new Error(firstError);
    }

    // * Proceed to the next middleware if no errors
    next();
  },
];

export const ValidateNewBlogs = [
  body("title").notEmpty().withMessage("Field title is required"),
  body("content").notEmpty().withMessage("Field content is required"),
  body("blogType").notEmpty().withMessage("Field blog type is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const allowedFields = ["title", "content", "blogType"];
    const receiveFields = Object.keys(req.body);

    // * Check for unexpected fields
    const extraFields = receiveFields.filter(
      (field) => !allowedFields.includes(field),
    );

    if (extraFields.length > 0) {
      res.status(400);
      // ! Throw Error for unexpected fields
      throw new Error(`Unexpected field: '${extraFields[0]}'`);
    }

    // * Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg as string;

      res.status(400);
      // ! Throw Error for validation errors
      throw new Error(firstError);
    }

    // * Proceed to the next middleware if no errors
    next();
  },
];

export const ValidateUsersUpdateInfo = [
  param("userId").isUUID().withMessage("User ID must be a valid UUID"),
  body("name")
    .notEmpty()
    .withMessage("Field 'name' is required")
    .isString()
    .withMessage("Field 'name' must be a string")
    .isLength({ min: 3, max: 30 })
    .withMessage("Field 'name' must be between 3 and 30 characters"),
  body("email")
    .notEmpty()
    .withMessage("Field 'email' is required")
    .isEmail()
    .withMessage("Field 'email' is an invalid email address"),
  body("image_path").notEmpty().withMessage("Field 'image_path' is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const allowedFields = ["name", "email", "image_path"];
    const receivedFields = Object.keys(req.body);

    // Check for unexpected fields
    const extraFields = receivedFields.filter(
      (field) => !allowedFields.includes(field),
    );

    if (extraFields.length > 0) {
      res.status(400);
      // Throw Error for unexpected fields
      throw new Error(`Unexpected field: '${extraFields[0]}'`);
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg as string;

      res.status(400);
      // Throw Error for validation errors
      throw new Error(firstError);
    }

    // Proceed to the next middleware if no errors
    next();
  },
];

export const ValidateNewPasswordRequest = [
  param("userId").isUUID().withMessage("User ID must be a valid UUID"),
  body("current_password")
    .notEmpty()
    .withMessage("Field 'current password' is required")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "Field 'current password' must be between 3 and 30 characters",
    ),
  body("new_password")
    .notEmpty()
    .withMessage("Field 'new password' is required")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("Field 'new password' must be between 3 and 30 characters"),
  (req: Request, res: Response, next: NextFunction) => {
    const allowedFields = ["current_password", "new_password"];
    const receivedFields = Object.keys(req.body);

    // Check for unexpected fields
    const extraFields = receivedFields.filter(
      (field) => !allowedFields.includes(field),
    );

    if (extraFields.length > 0) {
      res.status(400);
      // Throw Error for unexpected fields
      throw new Error(`Unexpected field: '${extraFields[0]}'`);
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg as string;

      res.status(400);
      // Throw Error for validation errors
      throw new Error(firstError);
    }

    // Proceed to the next middleware if no errors
    next();
  },
];
