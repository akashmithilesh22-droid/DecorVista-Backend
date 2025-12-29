import express from "express";
import {
  startSession,
  updateSession,
  downloadPDF,
} from "../controllers/session.controller.js";

const router = express.Router();

// create session
router.post("/start", startSession);

// update session data
router.put("/:id", updateSession);

// download PDF
router.get("/:id/pdf", downloadPDF);

export default router;
