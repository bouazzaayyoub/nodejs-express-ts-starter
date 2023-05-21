import express from "express";

// Controllers (route handlers)
import * as exampleController from "../../controllers/exemple";

const router = express.Router();

router.get("/", exampleController.getAll);
router.post("/", exampleController.createExample);

export default router;
