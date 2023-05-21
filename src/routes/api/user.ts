import express from "express";

// Controllers (route handlers)
import * as gamerController from "../../controllers/gamerController";

const router = express.Router();

router.get("/", gamerController.getAllElement);
router.post("/", gamerController.createElement);
router.put("/:id", gamerController.updateElement);
router.delete("/:id", gamerController.deleteElement);
router.delete("/", gamerController.deleteElementByName);

export default router;
