import express from "express";
import { downloadQuote } from "../controllers/quote.controller.js";

const router = express.Router();

router.post("/download", downloadQuote);

export default router;