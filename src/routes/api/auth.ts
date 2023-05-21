import express from "express";

import * as authController from "../../controllers/auth";

const router = express.Router();

router.post("/register", authController.registerController);
router.post("/login", authController.loginController);

export default router;
