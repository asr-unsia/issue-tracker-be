import { Router } from "express";
import authRouter from "./auth.route.js";

export const routerV1 = Router();
routerV1.use(authRouter);
