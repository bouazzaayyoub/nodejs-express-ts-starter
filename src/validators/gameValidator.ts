import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const createGameValidator = [
  body("name").notEmpty().withMessage("name is required"),
  body("gamers")
    .isArray()
    .custom((value) => {
      if (value.some((str: any) => typeof str !== "string")) {
        throw new Error("All values in the array must be strings");
      }
      return true;
    }),
];
