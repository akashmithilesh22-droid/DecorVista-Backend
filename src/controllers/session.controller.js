import Session from "../models/Session.js";
import { generatePDF } from "../utils/generatePDF.js";

/* ================= START SESSION ================= */
export const startSession = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required" });
    }

    const session = await Session.create({
      name,
      email,
      selections: [],
    });

    res.status(201).json({
      sessionId: session._id,
      name: session.name,
      email: session.email,
    });
  } catch (err) {
    console.error("Start session error:", err);
    res.status(500).json({ message: "Failed to start session" });
  }
};

/* ================= UPDATE SESSION ================= */
export const updateSession = async (req, res) => {
  try {
    const { roomType, budget, selections } = req.body;

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // ✅ Explicitly update fields (VERY IMPORTANT)
    session.roomType = roomType;
    session.budget = budget;
    session.selections = selections;

    await session.save();

    res.json({ message: "Session updated successfully" });
  } catch (err) {
    console.error("Update session error:", err);
    res.status(500).json({ message: "Failed to update session" });
  }
};

/* ================= DOWNLOAD PDF ================= */
export const downloadPDF = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (!session.selections || session.selections.length === 0) {
      return res
        .status(400)
        .json({ message: "No selections found for this session" });
    }

    generatePDF(session, res);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};
