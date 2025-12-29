import Session from "../models/Session.js";
import { generatePDF } from "../utils/generatePDF.js";

export const downloadQuote = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID required" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // IMPORTANT: do NOT send JSON here
    generatePDF(session, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};