import { Router } from "express";
import authRouter from "./auth.route.js";
import issueRouter from "./issue.route.js";

export const routerV1 = Router();
routerV1.use(authRouter);
routerV1.use(issueRouter);
