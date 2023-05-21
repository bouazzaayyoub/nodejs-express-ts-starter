import express, { NextFunction, Request, Response } from "express";

// Controllers (route handlers)
import * as gameController from "../../controllers/gameController";
import { createGameValidator } from "../../validators/gameValidator";
import { validationResult } from "express-validator";

const router = express.Router();

router.get("/", gameController.getAllElement);
router.post(
  "/",
  createGameValidator,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ message: "invalid" });
    next();
  },
  gameController.createElement
);
router.put("/:id", gameController.updateElement);
router.delete("/:id", gameController.deleteElement);
router.delete("/", gameController.deleteElementByName);

export default router;
