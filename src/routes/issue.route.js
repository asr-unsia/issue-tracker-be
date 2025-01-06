import { Router } from "express";
import {
  apiKeyMiddleware,
  jwtMiddleware,
} from "../middlewares/auth.middleware.js";
import {
  addIssue,
  getAllIssue,
  getIssueById,
} from "../controllers/issue.controller.js";

const router = Router();

router.get("/issues", apiKeyMiddleware, jwtMiddleware, getAllIssue);
router.get("/issues/:id", apiKeyMiddleware, jwtMiddleware, getIssueById);
router.post("/issues", apiKeyMiddleware, jwtMiddleware, addIssue);

export default router;
