import express from "express";
const router = express.Router();
import { login, register, infoUser } from "../controllers/auth.controller.js";
import { registerValidator } from "../middlewares/validationUser.js";
import { validateToken } from "../middlewares/validateToken.js";

router.post("/register", registerValidator, register);
router.post("/login", login);
router.get("/user", validateToken, infoUser);

export default router;
