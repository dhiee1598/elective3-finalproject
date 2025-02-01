import { body, validationResult } from "express-validator";
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
